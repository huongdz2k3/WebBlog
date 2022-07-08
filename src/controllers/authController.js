const models = require('./../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models/index')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signupPage = async (req, res, next) => {
    return res.render('signup.ejs')
}
exports.loginPage = async (req, res, next) => {
    return res.render('login.ejs')
}
exports.homePage = async (req, res, next) => {
    res.render('homePage.ejs')
    next()
}

exports.signup = async (req, res, next) => {
    try {
        let err = ''
        // generate password
        if (!req.body.email || !req.body.username || !req.body.password) {
            err = 'Please provide enough your information'
            return res.render('signup.ejs', { err })
        }
        const user = await db.User.findOne({ where: { email: req.body.email } })
        if (user) {
            err = 'This email currently exists'
            return res.render('signup.ejs', { err })
        }
        const salt = await bcrypt.genSalt(10)
        const hasdedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await db.User.create(
            {
                email: req.body.email,
                username: req.body.username,
                password: hasdedPassword
            }
        )
        const token = signToken(newUser.id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('access_token', token, cookieOptions)
        req.token = token
        return res.redirect('/posts/getAllPosts')
    } catch (err) {
        return res.render('error.ejs', { err })
    }
}

exports.login = async (req, res, next) => {
    try {
        let err = ''
        const { email, password } = req.body

        // ko co email password
        if (!email || !password) {
            err = 'Please provide email or password'
            return res.render('login.ejs', { err })
        }
        // sai password
        const newUser = await db.User.findOne({ where: { email: email } })
        const validPassword = await bcrypt.compare(password, newUser.password)
        if (!newUser || !validPassword) {
            err = 'Incorrect email or password'
            return res.render('login.ejs', { err })
        }
        // Thoa man 
        const token = signToken(newUser.id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000),
            httpOnly: true
        }
        res.cookie("access_token", token, cookieOptions)
        return res.redirect('/posts/getAllPosts')
    } catch (err) {
        return res.render('error.ejs', { err })
    }
}

exports.protect = async (req, res, next) => {

    try {
        // get token
        let token = req.cookies.access_token
        // verification token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        // Check if user still exists
        const currentUser = await db.User.findOne({ where: { id: decoded.id } })
        if (!currentUser) {
            return res.render('error.ejs', { err })
        }
        req.user = currentUser
        next()
    }
    catch (err) {
        return res.render('error.ejs', { err })
    }
}

