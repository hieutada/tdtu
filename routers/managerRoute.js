const express = require('express')
const passport = require('passport')
const app = express()
const router = express.Router()
const middleware = require('../middleware')
const User = require('../models/userModel')
const Notification = require('../models/notificationModel')

app.set("view engine", "ejs")

router.get('/', middleware.requireLogin, (req, res) => {
    if (req.user.username === 'admin@tdtu.edu.vn') {
        return res.redirect('/manager/admin')
    } else {
        return res.redirect('/manager/faculty')
    }
})

router.get('/admin', middleware.requireLoginAdmin, (req, res) => {
    return res.render('admin-manager', {
        title: 'Admin',
        layout: './layouts/managerLayout',
        idUser: req.user._id,
        script: '/javascripts/admin.js'
    })
})

router.get('/faculty', middleware.requireLoginFaculty, async (req, res) => {
    let noti = await Notification.find({postedBy: req.user._id})

    return res.render('faculty-manager', {
        title: 'Phòng Khoa',
        layout: './layouts/managerLayout',
        idUser: req.user._id,
        noti : noti.reverse(),
        script: '/javascripts/faculty.js'
    })
})

module.exports = router