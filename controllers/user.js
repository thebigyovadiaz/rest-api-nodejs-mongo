'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) return res.status(500).send({
      message: `Error al cargar el usuario: ${err}`
    })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'El Usuario no existe'})

    req.user = user
    res.status(200).send({ 
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(`Error al realizar la petición: ${err}`)
    if (!users) return res.status(404).send('No existen usuarios registrados')

    res.status(200).send({
      users
    })
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers
}
