const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');
const {customerSchema} = require('./customer');
const {movieSchema} = require('./movie');


const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

// Adding a static method -- to be available for class Rental
rentalSchema.statics.lookup = function(customerId, movieId) {
    return this.findOne({ 
        'customer._id': customerId, 
        'movie._id': movieId
    });
};

// Adding an instance method -- to be available on an instance of Rental
rentalSchema.methods.return = function() {
    this.dateReturned = new Date();

    const rentalDays = moment().diff(this.dateOut, 'days');
    this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

const Rental = mongoose.model('Rental', rentalSchema);


function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(rental, schema);

}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validateRental = validateRental;
