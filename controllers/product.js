'use strict';

const Product = require('../models/product')

function getProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send(`Error al realizar la petición: ${err}`)
    if (!product) return res.status(404).send('El producto no existe.')

    res.status(202).send({
      product
    })
  })
}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send(`Error al realizar la petición: ${err}`)
    if (!products) return res.status(404).send('No existen productos registrados')

    res.status(200).send({
      products
    })
  })
}

function saveProduct(req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStore) => {
    if (err) res.status(500).send(`Error al guardar en base de datos: ${err}`)

    res.status(200).send({
      product: productStore
    })
  })
}

function updateProduct(req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err) return res.status(500).send(`Error al actualizar el producto: ${err}`)

    res.status(202).send({
      product: productUpdate
    })
  })
}

function deleteProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send(`Error al borrar el producto: ${err}`)

    product.remove(err => {
      if (err) return res.status(500).send(`Error al borrar el producto: ${err}`)
      res.status(200).send({
        message: 'El producto ha sido eliminado'
      })
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}