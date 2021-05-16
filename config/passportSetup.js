const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/userModel')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
},
    function (accessToken, refreshToken, profile, done) {
        
        if ( profile.emails[0].value.search('student.tdtu.edu.vn') == -1) {
            return done(null, false)
        }

        User.findOne({ googleID: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser)
                } else {
                    new User({
                        googleID: profile.id,
                        displayName: profile.displayName,
                        username: profile.emails[0].value,
                        password: '',
                        profilePic: profile.photos[0].value,
                        role: 'student',
                        grade: '',
                        major: ''
                    }).save().then((newUser) => {
                        done(null, newUser)
                    })
                }
            })
    }
));

passport.use(new LocalStrategy(
    async function(username, password, done) {
        var user = await User.findOne({username: username})
        if (user.password == password) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }
))
