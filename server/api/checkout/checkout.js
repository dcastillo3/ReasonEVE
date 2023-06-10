const router = require('express').Router();
const { stripeClient } = require('../../stripe');
const { formatCheckoutSessionData } = require('../../utils/productUtils');
const { formatResponseData } = require('../../utils/utils');
const bodyParser = require('body-parser');

//Post requests below this line will have body parsed via json method
router.use(bodyParser.json());

//Enable if url encoding needs parsing
// router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async ({ body: { products, successUrl, cancelUrl }, headers: { host } }, res) => {
    try {
        const sessionData = formatCheckoutSessionData(products, successUrl, cancelUrl, host);
        const session = await stripeClient.checkout.sessions.create(sessionData);
        const responseData = formatResponseData(session.url);
    
        res.status(200).send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

module.exports = router;