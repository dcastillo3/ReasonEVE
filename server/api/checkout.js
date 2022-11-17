const router = require('express').Router();
const { stripeClient } = require('../stripe');

// DC-NOTE: Stripe redirect checkout session, bare bones
// DC-NOTE: Make origin url dynamic, match line items from request and get price ids
router.post('/create-checkout-session', async (req, res) => {
    const origin = 'http://localhost:9000/checkout';

    const session = await stripeClient.checkout.sessions.create({
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

module.exports = router;