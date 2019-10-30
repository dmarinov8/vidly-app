const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const validate = require('../middleware/validate');
const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();



router.get('/', auth, async (req, res) => {
    res.send(await Customer.find().sort('name'));
});

router.post('/', [auth, validate(validateCustomer)], async (req, res) => {

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    
    res.send(customer);
});

router.put('/:id', [auth, validateObjectId, validate(validateCustomer)], async (req, res) => {

    // Update the course properties
    let customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!customer) return res.status(404).send('The customer with this ID was not found...');

    res.send(customer);

});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with this ID was not found...');

    res.send(customer);

});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) return res.status(404).send('The customer with this ID was not found...');
    
    res.send(customer);
});        



module.exports = router;

