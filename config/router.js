const router = require('express').Router()

/**
 * Controllers
 */
const userController = require('../controllers/user-controller')
/**
 * Users
 */
router.get('/users', userController.getUsers)

module.exports = router
