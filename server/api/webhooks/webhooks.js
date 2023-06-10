const express = require('express');
const { stripeClient } = require('../../stripe');
const { formatResponseData } = require('../../utils/utils');
const { successfulPayment } = require('./webhooksConsts');

const router = express.Router();
const stripeCheckoutEndpointKey = process.env.NODE_ENV !== 'production' ? process.env.STRIPE_TEST_CHECKOUT_ENDPOINT_KEY : process.env.STRIPE_CHECKOUT_ENDPOINT_KEY;

router.post('/stripe-checkout', express.raw({ type: 'application/json' }), ({body, headers}, res) => {
    try {
        const stripeSignature = headers['stripe-signature'];
        const stripeEvent = stripeClient.webhooks.constructEvent(body, stripeSignature, stripeCheckoutEndpointKey);

        if(stripeEvent.type === successfulPayment) {
            const checkoutData = stripeEvent.data.object;

            //Build and send Amazon SES email
            
            console.log(JSON.stringify(checkoutData, null, 4));
        };

        const responseData = formatResponseData(null, null);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);

        return;
    };
});

module.exports = router;