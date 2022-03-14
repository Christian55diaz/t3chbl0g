//main index
//import router +routes
const router= require('express').Router();
const apiRoutes= require('./api');
const homeRoutes= require('./homeroutes.js');
const dashboardRoutes= require('./dashboardroutes.js')
//router.use
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;