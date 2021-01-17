const SimplePeer = require('simple-peer')
const io = require('socket.io-client')
const socket = io('http://localhost:3000')
const video = document.querySelector('video')

const client = {}

function grantedMedia(stream) {
  socket.emit('newClient')
  video.srcObject = stream
  video.play()

  function initPeer(type) {
    const peer = new SimplePeer({
      initiator: type == 'init' ? true : false,
      stream: stream,
      trickle: false
    })

    peer.on('stream', stream => {
      renderVideo(stream)
    })

    peer.on('close', () => {
      document.getElementById('incomingVideo').remove()
      peer.destroy()
    })

    return peer
  }

  function createPeer() {
    client.gotAnswer = false
    const peer = initPeer('init')

    peer.on('signal', data => {
      if (!client.gotAnswer) {
        socket.emit('offer', data)
      }
    })

    client.peer = peer
  }

  function frontAnswer(offer) {
    const peer = initPeer('notInit')
    peer.on('signal', data => {
      socket.emit('answer', data)
    })
    peer.signal(offer)
  }

  function signalAnswer(answer) {
    client.gotAnswer = true
    const peer = client.peer
    peer.signal(answer)
  }

  function renderVideo(stream) {
    const incomingVideo = document.createElement('video')
    incomingVideo.id = 'incomingVideo'
    incomingVideo.srcObject = stream
    incomingVideo.setAttribute('class', 'embed-responsive-item')
    document.querySelector('#incoming').appendChild(incomingVideo)
    incomingVideo.play()
  }

  function sessionActive() {
    document.write('User is busy')
  }

  socket.on('backOffer', frontAnswer)
  socket.on('backAnswer', signalAnswer)
  socket.on('sessionActive', sessionActive)
  socket.on('createPeer', createPeer)
}

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(grantedMedia).catch(err => {console.log(err)})


