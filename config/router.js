const router = require('express').Router()
const path = require('path')

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

router.get('/socket.io.min.js', (req, res) => {
  const file = `${__dirname}/../node_modules/socket.io/client-dist/socket.io.min.js`
  res.sendFile(path.resolve(file))
})

router.get('/socket.io.min.js.map', (req, res) => {
  const file = `${__dirname}/../node_modules/socket.io/client-dist/socket.io.min.js.map`
  res.sendFile(path.resolve(file))
})

module.exports = router
