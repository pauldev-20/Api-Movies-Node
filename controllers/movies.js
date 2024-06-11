import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genero } = req.query
    const movies = await this.movieModel.getAll({ genre: genero })
    res.json({ data: movies })
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json({ data: movie })
    res.status(404).json({ error: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    const newMovie = await this.movieModel.create(result.data)
    res.status(201).json({ data: newMovie })
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const movieIndex = await this.movieModel.update({ id, input: result.data })
    if (!movieIndex) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    return res.json({ data: movieIndex })
  }

  delete = async (req, res) => {
    const { id } = req.params
    const _id = await this.movieModel.delete({ id })
    if (!_id) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.json({ data: { _id }, message: 'Movie deleted' })
  }
}
