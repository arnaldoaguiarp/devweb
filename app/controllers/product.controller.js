const db = require("../models");
const Product = db.products;

exports.home = (req, res) => {
  //var seller = req.params.seller
  //var products = Product.findAll({ where: {sellerId: seller} })

  Product.findAll({ where: {sellerID: ssn.seller_id} })
  .then(data => {
    var products = data.map(function(response){ return response.dataValues });

    res.render('../views/pages/loja/produtos/index', {
      products: products,
      seller: ssn.seller_id
  });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}

exports.new = (req, res) => {
  res.render('../views/pages/loja/produtos/new', {
    seller: ssn.seller_id
  });
}

exports.edit = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
  .then(data => {
    res.render('../views/pages/loja/produtos/edit', {
      product: data.dataValues,
      seller: ssn.seller_id,
      id: id
    });
    console.log(data)
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  });
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Create a Tutorial
  const produto = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
    sellerId: ssn.seller_id
  };

  // Save Tutorial in the database
  Product.create(produto)
    .then(data => {
      res.redirect("/api/products/" + ssn.seller_id)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect("/api/products/" + ssn.seller_id)
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};


// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect("/api/products/" + ssn.seller_id)
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id
      });
    });
};