async function getUsers(req, res) {
  console.log(req.headers)

  res.render('users', {
    title: 'Users'
  })
}


const controller = Object.freeze({
  getUsers
})

module.exports = controller
