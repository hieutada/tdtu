require('dotenv').config();
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT

const path = require('path')
const session = require('express-session')

// API
const postRouter = require('./routers/api/post')
const faculty = require('./routers/api/faculty')
const notificationApi = require('./routers/api/notification')


const passport = require('passport')
const passportSetup = require('./config/passportSetup')
const database = require('./database')
const middleware = require('./middleware')


server = app.listen(port, () => console.log(`http://localhost:${port}`));
const io = require('socket.io')(server, {pingTimeout: 60000})
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayouts)
app.set("view engine", "ejs");

app.use(session({
    secret: "pika",
    resave: true,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended:false}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', require('./routers/authRoute'))
app.use('/login', require('./routers/loginRoute'))
app.use('/manager', require('./routers/managerRoute'))
app.use('/notifications', require('./routers/notificationRoute'))
app.use('/profile', require('./routers/profileRoute'))

app.use('/api/post', postRouter)
app.use('/api/faculty', faculty)
app.use('/api/notification', notificationApi)

app.get('/', middleware.requireLogin, (req, res)=>{
    let user = req.user
    res.render('home', {
        title: 'Home',
        layout: './layouts/generalLayout',
        displayName: user.displayName,
        profilePic: user.profilePic,
        username: user.username,
        idUser: user._id,
        roleUser: user.role,
        scriptPost: '/javascripts/post.js',
        scriptNoti: '/javascripts/notification.js'
    })
})

io.on('connection', (socket)=>{
    socket.on('setup', userData =>{
        socket.join(userData)
        socket.emit('connected')
    })
    socket.on('create noti',noti =>{
        socket.broadcast.emit('show noti', noti)
    })
    
})
