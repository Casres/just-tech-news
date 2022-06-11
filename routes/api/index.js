// this allows us to use router
const router = require('express').Router();

// this gets all of the user routes and puts them into a variable name 'userRoutes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

// this is using the file that has all of the user routes by accessing the file through the variable and putting '/users' in front of every single one of those routs
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;