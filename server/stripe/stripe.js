const stripe = require('stripe');
const { production, services } = require('../utils/consts');
const { serviceLog } = require('../utils/utils');

// Connect key to stripe
const stripeKey = process.env.NODE_ENV !== production ? process.env.STRIPE_TEST_KEY : process.env.STRIPE_KEY;
const stripeClient = stripe(stripeKey);

const createStripeProduct = async ({ name, description, price, images }) => {
    const stripeProduct = await stripeClient.products.create({
        name,
        description,
        default_price_data: {
            unit_amount: (price * 100),
            currency: 'usd'
        },
        images,
        expand: ['default_price']
    });

    serviceLog(services.stripe, `Created ${name} product`);

    return stripeProduct;
};

module.exports = {
    stripeClient,
    createStripeProduct
};