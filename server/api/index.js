const router = require('express').Router();

//Tracks route
router.use('/tracks', require('./tracks'));

//Packs route
router.use('/packs', require('./packs'));

//Checkout route
router.use('/checkout', require('./checkout'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;