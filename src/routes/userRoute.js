const router = require('express').Router()
const authController = require('./../controllers/authController')
// Signup Login FogotPassword RestetPassword
router.route('/signup')
    .get(authController.signupPage)
    .post(authController.signup)
router.route('/login')
    .get(authController.loginPage)
    .post(authController.login)


module.exports = router