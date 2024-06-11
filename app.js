import express from 'express'
// import movies from './movies.json' assert { type: "json" }
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.json({ message: 'Hola mundo' })
  })

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
  })
}
