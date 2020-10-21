const router = require('express').Router();
const User = require('./../models/User');
const isAuthenticated = require('./../middleware/isAuthenticated');
const isSuperAdmin = require('./../middleware/isSuperAdmin');
const { updateProfile, fetchAllUser, updateExistingUserProfile } = require('./../controllers/userController');

/* 
  Middileware verify user is autheticated Or Not
*/
router.use(isAuthenticated);

/* 
  Update User Profile Handler
*/
router.patch('/update', updateProfile);

/* 
  Fetch All Existing User Handler
*/
router.get('/all', isSuperAdmin, fetchAllUser);

/* 
  Updating Existing UserRole Or Department Handler
*/
router.patch('/update/:email', isSuperAdmin, updateExistingUserProfile);

module.exports = router;