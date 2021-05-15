const express = require('express')
const router = express.Router()
const app = express()
const middleware = require('../middleware')

app.set("view engine", "ejs")

router.get('/', middleware.requireLogin, (req, res)=>{
    let user = req.user
    res.render('profile', {
        displayName: user.displayName,
        profilePic: user.profilePic,
        username: user.username,
        createdAt: user.createdAt
    })
})

module.exports = router