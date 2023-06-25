const express = require('express');
const { stripeClient } = require('../../stripe/stripe');
const { formatResponseData } = require('../../utils/utils');
const { successfulCheckout, stripeCheckoutContentType, stripeSignatureHeader } = require('./webhooksConsts');
const { updatePurchasedProductsData, formatCheckoutProducts } = require('../../utils/productUtils');
const { production } = require('../../utils/consts');
const { sendProductDeliveryEmail } = require('../../aws/ses/ses');

const router = express.Router();
const stripeCheckoutEndpointKey = process.env.NODE_ENV !== production ? process.env.STRIPE_TEST_CHECKOUT_ENDPOINT_KEY : process.env.STRIPE_CHECKOUT_ENDPOINT_KEY;

router.post('/stripe-checkout', express.raw({ type: stripeCheckoutContentType }), async ({body, headers}, res) => {
    try {
        const stripeSignature = headers[stripeSignatureHeader];
        const {
            id: eventId,
            type: eventType,
            data: { object: { customer_details, metadata } }
        } = stripeClient.webhooks.constructEvent(body, stripeSignature, stripeCheckoutEndpointKey);
        const formattedCheckoutProducts = formatCheckoutProducts(metadata);

        if(eventType === successfulCheckout) {
            // Deliver email with product link
            await sendProductDeliveryEmail(customer_details, formattedCheckoutProducts);

            // Update purchased products with eventId and customer email
            updatePurchasedProductsData(eventId, customer_details, formattedCheckoutProducts);
        };

        const responseData = formatResponseData(null, null);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

module.exports = router;