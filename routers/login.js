const express = require('express')
const passport = require('passport')
const app = express()
const router = express.Router()

app.set("view engine", "ejs")

router.get('/', (req, res) => {
    return res.render('login', { title: 'Login', layout: './layouts/loginLayout' })
})

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/manager',
        failureRedirect: '/login'
    })
);
module.exports = router