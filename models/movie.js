const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre')


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 1000,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    }
});

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(1000),
        dailyRentalRate: Joi.number().min(0).max(100)
    };

    return Joi.validate(movie, schema);

}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validateMovie = validateMovie;
