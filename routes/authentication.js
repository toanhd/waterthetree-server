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
                title: 'No User found',
                error: {message: 'User not found'}
            })
        }
        res.status(200).json({
            message: 'success',
            user: user
        })
    })
});

router.post('/register', async function (req, res, next) {
    try {
        const {firstName, lastName, pwd, email} = req.body;
        const user = new User({
            firstName, lastName, password: sha256(pwd), email
        });
        res.status(201).json({
            message: 'user created',
            user: await user.save()
    })
    }
    catch (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        })
    }
});

module.exports = router;
