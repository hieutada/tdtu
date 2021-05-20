const express = require('express')
const router = express.Router()

const Post = require('../../models/postModel')
const User = require('../../models/userModel')


// Post 1 bai viet
router.post('/', async (req, res) => {
    var newPost = await Post({
        who: req.body.who,
        content: req.body.content,
        youtube: req.body.youtube
    }).save()
    newPost.who = await User.findOne({ _id: req.body.who })
    return res.status(200).send(newPost)
})

// Xóa 1 bài viết
router.delete('/', async (req, res) => {
    await Post.findByIdAndDelete({ _id: req.body.id })
    return res.status(200).send()
})

// Load tất cả nhiều bài viết
router.get('/', async (req, res) => {
    var allPost = await Post.find()
    for (var i = 0; i < allPost.length; i++) {
        allPost[i].who = await User.findOne({ _id: allPost[i].who })
    }
    return res.status(200).send(allPost)
})

module.exports = router