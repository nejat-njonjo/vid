const SimplePeer = require('simple-peer')
const io = require('socket.io-client')
const video = document.querySelector('video')
const messages = []

messages.forEach(message => {
  const p = document.createElement('p')
  
})

const socket = io('http://localhost:3000')

socket.emit('sen', {
  name: 'Jame', age: 30
})

socket.on('much', data => {
  console.log(data)
})