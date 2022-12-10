const router = require('express').Router();

//Tracks route
router.use('/tracks', require('./tracks/tracks'));

//Packs route
router.use('/packs', require('./packs/packs'));

//Player route
router.use('/player', require('./player/player'));

//Checkout route
router.use('/checkout', require('./checkout/checkout'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;