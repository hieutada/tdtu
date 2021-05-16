const express = require('express')
const router = express.Router()
const middleware = require('../middleware')

router.get('/', middleware.requireLogin, (req, res)=>{
    let user = req.user
    res.render('notifications', {
        title: 'Notifications',
        layout: './layouts/generalLayout',
        displayName: user.displayName,
        profilePic: user.profilePic,
        username: user.username,
        idUser: user._id,
        roleUser: user.role
    })
})

// router.get('/show/:id',  async (req, res)=>{
//     var noti = await Notification.findById(req.params.id)
    
// })
module.exports = router