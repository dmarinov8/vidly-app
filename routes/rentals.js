const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {Customer} = require('../models/customer')
const {Movie} = require('../models/movie')
const {Rental, validateRental} = require('../models/rental')
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    res.send(await Rental.find().sort('-dateOut'));
});

router.post('/', [auth, validate(validateRental)], async (req, res) => {

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.')

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({ 
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title
        },
        dateOut: Date.now(),
        rentalFee: req.body.rentalFee
    });
    
    // rental = await rental.save();
    
    // movie.numberInStock--;
    // movie.save();

    // Two-step save --- like a transaction
    try {
        new Fawn.Task()
            .save('rentals', rental)   // the actual name of the collection & the document to be saved
            .update('movies', { _id: movie._id }, {     // collection, query
                $inc: { numberInStock: -1 }             // update obj
            })  
            .run();
    
        res.send(rental);
    }
    catch (ex) {
        res.status(500).send('Something failed.');
    }
    
});



module.exports = router;

