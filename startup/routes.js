const express = require('express');
const home = require('../routes/home');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const returns = require('../routes/returns');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    
    app.set('view engine', 'pug');

    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/returns', returns);
    app.use('/api/auth', auth);
    app.use('/', home);

    app.use(error);
}