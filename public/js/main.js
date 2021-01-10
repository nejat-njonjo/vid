const Peer = require('simple-peer')
const socket = io()
const video = document.querySelector('video')

let client = {}

/**
 * Video Streams
 */
navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(stream => {
    socket.emit('NewClient')
    video.srcObject = stream
    video.play()

    function initializePeer(type) {
      const initiator = new Peer({
        initiator: type === 'init' ? true : false,
        stream: stream,
        trickle: false
      })

      initiator.on('stream', peerStream => {
        CreateVideo(peerStream)
      })

      initiator.on('close', () => {
        document.getElementById('peerVideo').remove()
        initiator.destroy()
      })

      return initiator
    }

    function makePeer() {
      
    }
  })
  .catch(error => {
    document.write(error)
  })