'use strict';

const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    return console.log(`Error al conectar con la base de datos: ${err}`)
  }
  console.log('Conexión con la base de datos establecida');

  app.listen(config.port, () => {
    console.log(`API Rest corriendo en http://localhost:${config.port}`)
  })
})
