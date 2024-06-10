const express = require('express')
const movies = require('./movies.json')
const crypto = require('crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:5173',
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  }))
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json({ message: 'Hola mundo'})
})

app.get('/movies', (req, res) => {
    const { genero } = req.query
    if (genero) {
        const filterMovies = movies.filter(m => m.genre.some( g => g.toLowerCase() === genero.toLowerCase()))
        return res.json({data: filterMovies})
    }
    res.json({data: movies})
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(m => m.id === id)
    if (movie) return res.json({ data: movie })
    res.status(404).json({ error: 'Movie not found' })
})    

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: result.error })
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json({ data: {...newMovie, _id: newMovie.id} })
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const movieIndex = movies.findIndex(m => m.id === id)
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' })
    }
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json({ data: updateMovie })

})

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(m => m.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)
    res.json({ data: { id }, message: 'Movie deleted' })
})

/*app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACEPPT_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        }
    res.send(200)
})*/

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})