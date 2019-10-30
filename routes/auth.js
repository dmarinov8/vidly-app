const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    // Validate the input
    const { error } = validate(req.body); // { error } === result.error
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');
    
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name','email'])); // header: prefix with 'x-' for custom names

});


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()  // check input (lower length) then save hashed (1024)
    };

    return Joi.validate(req, schema);
}


module.exports = router;

