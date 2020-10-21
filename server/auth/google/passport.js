let GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./../../models/User');
const jwt = require('jsonwebtoken');


module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/auth/google/callback`
    },
        async (accessToken, refreshToken, profile, done) => {
            let userrole = 'EMPLOYEE';
            let name = profile.displayName;
            let department = '';
            //checking is user is already in database or not
            let checkUserIfExist = await User.findOne({ email: profile.emails[0].value }).select('-_id');
            if (checkUserIfExist) {
                userrole = checkUserIfExist.userRole
                name = checkUserIfExist.name
                department = checkUserIfExist.department
            }
            User.findOneAndUpdate({ email: profile.emails[0].value },
                {
                    $set: {
                        name: name,
                        email: profile.emails[0].value,
                        profileUrl: profile.photos[0].value,
                        token: jwt.sign({ id: profile.emails[0].value, userRole: userrole }, process.env.JWT_SECRET),
                        userRole: userrole,
                        department: department,
                        createdOn: Date.now()
                    }
                }
                , {
                    upsert: true,
                    useFindAndModify: false
                })
                .then(user => done(null, user))
                .catch(err => done(err, null))
        }
    ));
    // serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById({ _id: id }, function (err, user) {
            done(err, user);
        });
    });
}

