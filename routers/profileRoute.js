const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const Users = require('../models/userModel')

const locallistmajor = [
    'Khoa Mỹ thuật công nghiệp',
    'Khoa Điện – Điện tử',
    'Khoa Công nghệ thông tin',
    'Khoa Quản trị kinh doanh',
    'Khoa Môi trường và bảo hộ lao động',
    'Khoa Lao động công đoàn',
    'Khoa Tài chính ngân hàng',
    'Khoa giáo dục quốc tế'
]

router.get('/', middleware.requireLogin, (req, res)=>{
    let user = req.user
    res.render('profile', {
        title: user.displayName,
        layout: './layouts/generalLayout',
        displayName: user.displayName,
        profilePic: user.profilePic,
        username: user.username,
        idUser: user._id,
        roleUser: user.role,
        grade: user.grade,
        major: user.major,
        listmajor: locallistmajor,
        scriptPost: 2
    })
})

router.get('/:idshowuser', middleware.requireLogin, async (req, res)=>{

    // user đang xem
    let user_view = await Users.findOne({_id: req.params.idshowuser})
    console.log(user_view._id)

    // id user hiện tại đang đăng nhập
    let id_user_current = req.user._id
    console.log(id_user_current)

    // có quyền edit hay ko
    let edit = false
    if (String(user_view._id) == String(id_user_current)) {
        edit = true
    }
    console.log(edit)

    // xem nguoi dung bat ki
    res.render('profile', {
        title: user_view.displayName,
        layout: './layouts/profileLayout',
        displayName: user_view.displayName,
        profilePic: user_view.profilePic,
        username: user_view.username,
        idUser: user_view._id,
        roleUser: user_view.role,
        grade: user_view.grade,
        major: user_view.major,
        listmajor: locallistmajor,
        scriptPost: 2,
        edit : edit
    })
})

module.exports = router