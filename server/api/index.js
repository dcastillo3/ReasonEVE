const router = require('express').Router();

//Tracks route
router.use('/tracks', require('./tracks/tracks'));

//Packs route
router.use('/packs', require('./packs/packs'));

//Playlist route
router.use('/playlist', require('./playlist/playlist'));

//Checkout route
router.use('/checkout', require('./checkout/checkout'));

//Webhooks route
router.use('/webhooks', require('./webhooks/webhooks'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    
    error.status = 404;
    next(error);
});

module.exports = router;