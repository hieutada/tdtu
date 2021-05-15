const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 8080

const path = require('path')
const session = require('express-session')

//route api
const loginRouter = require('./routers/login')
const authRouter = require('./routers/auth')
const managerRouter = require('./routers/manager')
const postRouter = require('./routers/api/post')
const faculty = require('./routers/api/faculty')
const passport = require('passport')
const database = require('./database')
const passportSetup = require('./config/passportSetup')
const notificationApi = require('./routers/api/notification')
const middleware = require('./middleware')
const Notification = require('./models/notificationModel')
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

app.use('/login', loginRouter)
app.use('/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/manager', managerRouter)
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
        scriptPost: 1
    })
})

app.get('/notifications', middleware.requireLogin, (req, res)=>{
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

app.get('/profile', middleware.requireLogin, (req, res)=>{
    let user = req.user
    res.render('profile', {
        title: 'Profile',
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
app.get('/notification/show/:id',  async (req, res)=>{
    var noti = await Notification.findById(req.params.id)
    
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