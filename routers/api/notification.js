const express = require('express')
const router = express.Router()

const User = require('../../models/userModel')
const Notification = require('../../models/notificationModel')

router.post('/', async (req, res) =>{
    Notification(req.body).save()
    .then(async (noti)=>{
        noti.postedBy = await req.user
        // console.log(noti.postedBy)
        return res.status(200).send(noti)
    })
})

router.get('/', async (req, res) => {
    var allNoti = await Notification.find().populate('postedBy')
    return res.status(200).send(allNoti)
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let allNoti = await Notification.find({postedBy: id})
    return res.status(200).send(allNoti)
})


router.put('/:id', async (req, res) =>{
    await Notification.findByIdAndUpdate(req.params.id, {"$set": req.body}, {new: true})
    return res.sendStatus(200)
})

router.delete('/:id',  async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id)
    return res.sendStatus(200) 
})

module.exports = router