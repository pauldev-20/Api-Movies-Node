const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required, please provide a title'
    }),
    year: z.number().int().positive().min(1900).max(new Date().getFullYear()),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(0),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller','Crime', 'Sci-Fi']),
        {
            invalid_type_error: 'Genre must be an array of strings',
        }
    )
})

function validateMovie(object) {
    return movieSchema.safeParse(object)
}

module.exports = {
    validateMovie
}