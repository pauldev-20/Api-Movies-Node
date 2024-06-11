import { requireJson } from '../utils.js'
import { randomUUID } from 'crypto'
const movies = requireJson('./movies.json')
export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    }
    return movies
  }

  static async getById ({ id }) {
    return movies.find(m => m.id === id)
  }

  static async create (input) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(m => m.id === id)
    if (movieIndex === -1) {
      return false
    }
    const updateMovie = {
      ...movies[movieIndex],
      ...input
    }

    movies[movieIndex] = updateMovie
    return updateMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(m => m.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return id
  }
}
