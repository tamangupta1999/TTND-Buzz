const router = require('express').Router();
const passport = require('passport');
const User = require('./../models/User');
const isSuperAdmin = require('./../middleware/isSuperAdmin');
const isAuthenticated = require('./../middleware/isAuthenticated');
const { fetchLoggedInUser, logout, fetchUiConfig, addMoreDepartment } = require('./../controllers/authenticationController');

/*
  Google auth
*/
router.get(`/auth/google`,
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
/*
  Google auth callback
 */
router.get(`/auth/google/callback`,
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        if (req.user.userRole === 'SUPER_ADMIN') {
            res.redirect('/dashboard');
        } else {
            if (req.user.department.length > 0) {
                res.redirect('/buzz');
            } else {
                res.redirect('/profile');
            }
        }
    });

/* 
  fetch current logged in user details..
*/
router.get('/currentUser', fetchLoggedInUser);

/*
logout handler
 */
router.post('/logout', logout);

/*
    Fetching UI Config..
*/
router.get('/uiConfig', isAuthenticated, fetchUiConfig);

/*
    Updating or Adding Deparment..
*/
router.patch('/uiConfig/update/:id', isAuthenticated, isSuperAdmin, addMoreDepartment)

module.exports = router;
