
const db = require('../models/index')

exports.getAllPosts = async (req, res) => {

    try {
        const posts = await db.Post.findAll({
            include: {
                model: db.User,
                as: 'userData',
            }
        })
        res.render('homePage.ejs', { posts })
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}

exports.getOnePost = async (req, res) => {
    try {
        // const user = await db.User.findOne({ where: { email: req.body.email } })

        const post = await db.Post.findOne({ where: { id: req.params.id } })
        console.log(post)
        const user = await db.User.findOne({ where: { id: post.userId } })
        res.render('onePost.ejs', { post, user })
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}
exports.getCreatePage = async (req, res) => {
    try {
        res.render('createPost.ejs')
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}

exports.getUpdatePage = async (req, res) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } })
        res.render('updatePost.ejs', { post })
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}
exports.getYourPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: {
                model: db.User,
                as: 'userData',
            },
            where: { userId: req.user.id }
        })
        res.render('yourPosts.ejs', { posts })
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}

exports.createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body
        const newPost = db.Post.create({
            title: title,
            category: category,
            content: content,
            userId: req.user.id
        })
        res.redirect('/posts/getAllPosts')
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}


exports.updatePost = async (req, res) => {
    try {
        const { title, category, content } = req.body
        const update = db.Post.update({
            title: title,
            category: category,
            content: content,
        }, { where: { id: req.params.id } })
        res.redirect('/posts/getYourPosts')
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}

exports.deletePost = async (req, res) => {
    try {
        await db.Post.destroy({ where: { id: req.params.id } })
        res.redirect('/posts/getYourPosts')
    } catch (err) {
        console.log(err)
        return res.render('error.ejs', { err })
    }
}