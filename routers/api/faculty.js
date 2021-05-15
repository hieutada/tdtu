const express = require('express')
const router = express.Router()

const Post = require('../../models/postModel')
const User = require('../../models/userModel')

router.post('/', async (req, res) =>{
    User(req.body).save()
    .then(()=>{
        return res.sendStatus(200)
    })
})
router.get('/',  async (req, res) =>{
    var data = await User.find({role: 'faculty'})
    return res.status(200).send(data)
})
router.put('/:id',  async (req, res) =>{
    var user = await User.findByIdAndUpdate(req.params.id, {"$set": req.body}, {new: true})
    return res.sendStatus(200)
    
})
router.delete('/:id',  async (req, res) =>{
    var user = await User.findByIdAndDelete(req.params.id)
    return res.sendStatus(200)
    
})
router.get('/:id', async (req,res)=>{
    User.findById(req.params.id).then((user) =>{
        return res.status(200).send(user)
    })
})
module.exports = router