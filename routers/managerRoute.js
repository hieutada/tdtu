const express = require('express')
const passport = require('passport')
const app = express()
const router = express.Router()
const middleware = require('../middleware')

app.set("view engine", "ejs")

router.get('/', middleware.requireLogin, (req, res) => {
    if (req.user.username === 'admin@tdtu.edu.vn') {
        return res.redirect('/manager/admin')
    } else {
        return res.redirect('/manager/faculty')
    }
})

router.get('/admin', middleware.requireLoginAdmin, (req, res) => {
    return res.render('admin', {
        title: 'Admin',
        layout: './layouts/managerLayout',
        idUser: req.user._id
    })
})

router.get('/faculty', middleware.requireLoginFaculty, (req, res) => {
    return res.render('faculty', {
        title: 'Phòng Khoa',
        layout: './layouts/managerLayout',
        idUser: req.user._id
    })
})

module.exports = router