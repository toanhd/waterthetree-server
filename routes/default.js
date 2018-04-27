// const io = require('socket.io');
const router = require('express').Router();

router.get('/', function (req, res, next) {

    return res.status(200).json({
        message: 'access default route',
    })
});


module.exports = router;
