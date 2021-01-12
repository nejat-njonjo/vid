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
      client.gotAnswer = false
      const initiator = initializePeer('init')
      initiator.on('signal', data => {
        if (!client.gotAnswer) {
          socket.emit('Offer', data)
        }
      })
      client.peer = initiator
    }

    function FrontAnswer(offer) {
      const peer = initializePeer('notInit')
      peer.on('signal', data => {
        socket.emit('Answer', data)
      })
      client.peer = peer
    }

    function signalAnswer(answer) {
      client.gotAnswer = true
      let peer = client.peer
      peer.signal(answer)
    }

    function CreateVideo(stream) {
      const embedVideo = document.createElement('video')
      embedVideo.id = 'peerVideo'
      embedVideo.srcObject = stream
      embedVideo.classList.add('embed-reponsive-item')
      document.querySelector('#peerDiv').appendChild(embedVideo)
    }

    function sessionActive() {
      document.write('User is on another call')
    }

    
  })
  .catch(error => {
    document.write(error)
  })