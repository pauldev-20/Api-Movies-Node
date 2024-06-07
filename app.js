const express = require('express')
const movies = require('./movies.json')
const crypto = require('crypto')
const { validateMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
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

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})