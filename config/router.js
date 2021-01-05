const router = require('express').Router()

/**
 * Controllers
 */
const userController = require('../controllers/user-controller')
const chatController = require('../controllers/chat-controller')

/**
 * Chats
 */
router.get('/', chatController.getChats)

/**
 * Users
 */
router.get('/users', userController.getUsers)

module.exports = router
