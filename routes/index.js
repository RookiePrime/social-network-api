const router = require('express').Router();
const apiRoutes = require('./api');
// Why make an api folder and api routes? In case one were to actually want to make a front-end for this thing!
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> 404 Error! </h1>');
});

module.exports = router;