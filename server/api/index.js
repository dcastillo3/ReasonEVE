const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const stripe = require('stripe');
const multer  = require('multer');

// Connect key to stripe
// const stripeKey = process.env.NODE_ENV !== 'production' ? process.env.STRIPE_TEST_KEY : process.env.STRIPE_KEY;
const stripeKey = process.env.STRIPE_TEST_SECRET_KEY;
const stripeInstance = stripe(stripeKey);

// Read tracks directory and generate track data
router.get('/getTracks', (req, res) => {
    try {
        const playlist = [];
        const tracksPath = path.join(__dirname, '../../tracks');
        const trackFolders = fs.readdirSync(tracksPath);
        const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/tracks';

        trackFolders.forEach((trackFolder, id) => {
            const trackPath = path.join(tracksPath, trackFolder);
            const trackFiles = fs.readdirSync(trackPath);
            let trackData = {};

            if (trackFiles.length) {
                trackFiles.forEach(file => {
                    const fileName = path.parse(file).name;
                    const extension = path.extname(file);

                    if (extension === '.mp3') {
                        trackData = {
                            ...trackData,
                            id,
                            title: fileName,
                            artist: 'ReasonEVE',
                            url: `${cdnBaseUrl}/${fileName}/${file}`
                        };
                    } else {
                        trackData = {
                            ...trackData,
                            coverArt: `${cdnBaseUrl}/${fileName}/${file}`,
                        };
                    };
                });
            };

            playlist.push(trackData);
        });

        res.send(playlist);
    } catch (error) {
        throw (error);
    };
});

// /addTrack upload destination and fields to upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { trackName } = req.body;
        const newTrackPath = path.join(__dirname, '../../tracks', trackName);

        //Make new directory if doesn't exist
        !fs.existsSync(newTrackPath) && fs.mkdirSync(newTrackPath);

        cb(null, newTrackPath);
    },
    filename: (req, file, cb) => {
        const { trackName } = req.body;
        const extension = path.extname(file.originalname);
        const fileName = `${trackName}${extension}`;

        cb(null, fileName);
    }
});
const upload = multer({ storage });
const trackUpload = upload.fields([{ name: 'track', maxCount: 1 }, { name: 'coverArt', maxCount: 1 }]);

// Add to tracks directory
router.post('/addTrack', trackUpload, (req, res) => {
    res.send({
        success: true,
        message: 'Track added successfully'
    });
});

// DC-NOTE: Stripe redirect checkout session, bare bones
// DC-NOTE: Make origin url dynamic, match line items from request and get price ids
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