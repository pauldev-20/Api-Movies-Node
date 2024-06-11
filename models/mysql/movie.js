import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'api_movies_data'
}

const con = await mysql.createConnection(config)

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await con.query(
        'SELECT id FROM genre WHERE LOWER(name) = ?', [lowerCaseGenre]
      )
      if (genres.length === 0) {
        return []
      }
      const [movies] = await con.query(
        'SELECT title, year, director, duration, poster, rate, id FROM movie as M INNER JOIN movie_genres ON M.id = movie_genres.movie_id WHERE movie_genres.genre_id IN(?)', [genres.map(g => g.id)])
      return movies
    }
    const [movies] = await con.query(
      'SELECT title, year, director, duration, poster, rate, id FROM movie'
    )
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await con.query(
      'SELECT title, year, director, duration, poster, rate, id FROM movie WHERE id = ?', [id]
    )
    if (movie.length === 0) {
      return null
    }
    return movie
  }

  static async create (input) {
    const {
      genre,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input
    const _id = randomUUID()
    con.beginTransaction()
    const result = await con.query(
      'INSERT INTO movie (id, title, year, duration, director, rate, poster) VALUES (?, ?, ?, ?, ?, ?, ?)', [_id, title, year, duration, director, rate, poster]
    )
    if (result.affectedRows === 0) {
      return null
    }
    if (genre) {
      const [genres] = await con.query(
        'SELECT id FROM genre WHERE LOWER(name) IN (?)', [input.genre.map(g => g.toLowerCase())]
      )
      genres.forEach(async g => {
        await con.query(
          'INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)', [_id, g.id]
        )
      })
    }
    con.commit()
    const [movie] = await con.query(
      'SELECT title, year, director, duration, poster, rate, id FROM movie WHERE id = ?', [_id]
    )
    return movie[0]
  }

  static async update ({ id, input }) {
    const {
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input
    const [movie] = await con.query(
      'UPDATE movie SET title = ?, year = ?, duration = ?, director = ?, rate = ?, poster = ? WHERE id = ?', [title, year, duration, director, rate, poster, id]
    )
    if (movie.affectedRows === 0) {
      return null
    }
    const [updatedMovie] = await con.query(
      'SELECT title, year, director, duration, poster, rate, id FROM movie WHERE id = ?', [id]
    )
    return updatedMovie[0]
  }

  static async delete ({ id }) {
    const [movie] = await con.query(
      'DELETE FROM movie WHERE id = ?', [id]
    )
    if (movie.affectedRows === 0) {
      return null
    }
    return id
  }
}
