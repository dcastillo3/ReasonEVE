const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const stripe = require('stripe');

// Connect key to stripe
// const stripeKey = process.env.NODE_ENV !== 'production' ? process.env.STRIPE_TEST_KEY : process.env.STRIPE_KEY;
const stripeKey = process.env.STRIPE_TEST_SECRET_KEY;
const stripeInstance = stripe(stripeKey);

// Read tracks directory and generate track data
router.get('/getTracks', (req, res) => {
    const tracksDirectory = path.join(__dirname, '../../tracks');

    fs.readdir(tracksDirectory, (err, tracks) => {
        if (err) {
            console.log('Make sure tracks directory is in root');
            throw err;
        };

        if (tracks.length) {
            const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/tracks';
            const playlist = tracks.map((track, id) => ({
                id,
                coverArt: 'https://media.gettyimages.com/photos/line-subway-train-in-queens-with-manhattan-skyline-new-york-city-picture-id1189547726?s=612x612',
                title: path.parse(track).name,
                artist: 'ReasonEVE',
                url: `${cdnBaseUrl}/${track}`
            }));

            res.send(playlist);
        };
    });
});

// DC-NOTE: Stripe redirect checkout session, bare bones
router.post('/create-checkout-session', async (req, res) => {
    const origin = 'http://localhost:9000/checkout';

    const session = await stripeInstance.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1M0f7HDfmT9zYk9OvyBvVDqF',
                quantity: 1,
            },
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1M0aoUDfmT9zYk9OPVEyqDgF',
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: `${origin}?success=true`,
        cancel_url: `${origin}?canceled=true`,
    });

    res.redirect(303, session.url);
});

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;