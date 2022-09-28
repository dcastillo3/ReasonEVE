const router = require('express').Router();

router.get('/testForReact', (req, res) => {
    console.log('I am in the test express route')
    res.send('This message is from api/testForReact!')
});

router.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

module.exports = router;