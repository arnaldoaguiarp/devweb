const db = require("../models");
const Product = db.products;

exports.about = (req, res) => {
  res.render('../views/pages/about') 
}

exports.cart = (req, res) => {
  res.render('../views/pages/loja/pedido/index') 
}

exports.index = (req, res) => {
  Product.findAll({ where: {} })
  .then(data => {
    var products = data.map(function(response){ return response.dataValues });

    res.render('../views/pages/home/index', {
      products: products
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}

exports.product = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
  .then(data => {
    res.render('../views/pages/home/show', {
      product: data.dataValues
    });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  });
}

exports.store = (req, res) => {
  Product.findAll({ where: {} })
  .then(data => {
    var products = data.map(function(response){ return response.dataValues });

    res.render('../views/pages/home/store', {
      products: products
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}