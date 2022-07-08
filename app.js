const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const session = require('express-session')
const flush = require('connect-flash')
const cookieParser = require('cookie-parser')
const userRouter = require('./src/routes/userRoute')
const postRouter = require('./src/routes/postRoute')
const likeRouter = require('./src/routes/likeRoute')
const commentRouter = require('./src/routes/commentRoute')
const configViewEngine = require('./src/config/Viewengine')

// initialize router

app.use(helmet()) // security
app.use(morgan('dev'))

// Body parser , reading data from body into req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public')) // cau hinh static file
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}))
app.use(flush())
// render ejs
configViewEngine(app)
// Router hander
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/likes', likeRouter)
app.use('/comments', commentRouter)

module.exports = app