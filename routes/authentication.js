const express = require('express');
const router = express.Router();
const sha256 = require('sha256');

const User = require('../models/user');

router.get('/:id', function (req, res, next) {
    console.log('get user infomation');
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        if (!user) {
            return res.status(500).json({
                title: 'No plant found',
                error: {message: 'User not found'}
            })
        }
        res.status(200).json({
            message: 'success',
            user: user
        })
    })
});

router.post('/register', function (req, res, next) {
    const temp_pwd = 'temppwd'
    const user = new User({
        firstName: 'Toan',
        lastName: 'Han Duc',
        password: sha256(temp_pwd),
        email: 'toanhanduc3@gmail.com'
    });
    user.save(function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        res.status(201).json({
            message: 'user created',
            user: user
        })
    })
});

module.exports = router;
