const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const Notifications = require('../models/notificationModel')
const User = require('../models/userModel')

router.get('/', middleware.requireLogin, (req, res)=>{
    let user = req.user
    res.render('notifications', {
        title: 'Notifications',
        layout: './layouts/generalLayout',
        displayName: user.displayName,
        profilePic: user.profilePic,
        username: user.username,
        idUser: user._id,
        roleUser : user.role
    })
})

router.get('/faculty', middleware.requireLogin, async (req, res)=>{
    let faculty = await User.find({role: 'faculty'})
    res.render('faculty', {
        title: 'Phòng Ban',
        layout: './layouts/layout',
        facultyList : faculty
    })
})

router.get('/faculty/:id', middleware.requireLogin, async (req, res)=>{
    let id = req.params.id
    let noti = await Notifications.find({postedBy: id})
    let user = await User.findById(id)
    res.render('faculty-noti', {
        title: 'Notifications',
        layout: './layouts/layout',
        facultyName : user.displayName,
        notiList : noti
    })
})

router.get('/detail/:id', middleware.requireLogin, async (req, res)=>{
    let id = req.params.id
    let noti = await Notifications.findById(id).populate('postedBy')
    let date = String(noti.updatedAt).split('T')
    res.render('detail-noti', {
        title : 'Chi tiết thông báo',
        layout : './layouts/layout',
        noti_title : noti.title,
        noti_content : noti.content,
        postedByName: noti.postedBy.displayName,
        postedById : noti.postedBy._id,
        date : date[0]
    })
})



module.exports = router