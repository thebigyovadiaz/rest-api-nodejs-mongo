'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const api = require('./routes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use('/api', api)

// Rutas para consultar API en Front
app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/product', (req, res) => {
  res.render('product')
})

module.exports = app
