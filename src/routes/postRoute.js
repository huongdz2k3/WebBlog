const router = require('express').Router()
const postController = require('./../controllers/postController')
const authController = require('./../controllers/authController')

router.route('/getAllPosts')
    .get(authController.protect, postController.getAllPosts)
router.route('/getOnePost/:id').get(authController.protect, postController.getOnePost)
router.route('/createPost').get(authController.protect, postController.getCreatePage).post(authController.protect, postController.createPost)
router.route('/getYourPosts').get(authController.protect, postController.getYourPosts)
router.route('/updateYourPost/:id')
    .get(authController.protect, postController.getUpdatePage)
    .post(authController.protect, postController.updatePost)
router.route('/deleteYourPost/:id').post(authController.protect, postController.deletePost)
module.exports = router