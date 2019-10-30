const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');


describe('user.generateAuthToken', () => {
    it('should return valid JWT token', () => {
        const payload = { 
            _id: new mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true
        };
        const user = new User(payload);
        // console.log(user);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // console.log(decoded);

        expect(decoded).toMatchObject(payload);
    })
});
