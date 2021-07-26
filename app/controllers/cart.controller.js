// cart.controller.js

const db = require("../models");
const Cart = db.carts;
const Op = db.Sequelize.Op;

// Create and Save a new Cart
exports.create = (req, res) => {
 
  // Create a Cart
  const carrinho = {
    produto: req.body.produto,
    pedido: req.body.pedido,
    quantidade: req.body.quantidade,
    valor_total: req.body.valor_total,
  };

  // Save Cart in the database
  Cart.create(carrinho)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cart."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const title = req.query.usuario;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Cart.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Carts."
      });
    });
};

// Find a single Cart with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cart with id=" + id
      });
    });
};

// Update a Cart by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cart.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cart with id=" + id
      });
    });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cart with id=" + id
      });
    });
};

// Delete all products from the database.
exports.deleteAll = (req, res) => {
  Cart.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Carts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Carts."
      });
    });
};
