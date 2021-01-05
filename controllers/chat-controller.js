async function getChats(req, res) {
  res.render('index', {
    title: 'Video Call'
  })
}

const controller = Object.freeze({
  getChats
})

module.exports = controller
