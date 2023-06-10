const stripe = require('stripe');

// Connect key to stripe
const stripeKey = process.env.NODE_ENV !== 'production' ? process.env.STRIPE_TEST_KEY : process.env.STRIPE_KEY;
const stripeClient = stripe(stripeKey);

const createStripeProduct = async (name, price) => {
    const stripeProduct = await stripeClient.products.create({
        name,
        default_price_data: {
            unit_amount: (price * 100),
            currency: 'usd'
        },
        expand: ['default_price'],
    });

    return stripeProduct;
};

module.exports = {
    stripeClient,
    createStripeProduct
};