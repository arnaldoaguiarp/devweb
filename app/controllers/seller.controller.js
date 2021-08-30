// seller.controller.js

const db = require("../models");
const Seller = db.sellers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request

  /*
if (!req.body.usuario) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  */

 
  // Create a Tutorial
  const tutorial = {
    usuario: req.body.usuario,
    cnpj: req.body.cnpj,
    telefone: req.body.telefone,
    email: req.body.email,
    senha: req.body.senha
  };

  // Save Tutorial in the database
  Seller.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;

  Seller.findByPk(id)
  .then(data => {
    res.render('../views/pages/sellers/edtSeller', {
      id: data.dataValues.id
    });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error with id=" + id
    });
  });
}

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const title = req.query.usuario;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Seller.findAll({ where: condition })
    .then(data => {
      res.render('../views/pages/sellers/listSellers', {data})
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Seller.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.renderUpdate = (req, res) => {
  const id = req.params.id;
    Seller.findByPk(id)
    .then(data => {
      res.render('../views/pages/sellers/edtSeller', {data})
    })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Seller.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        return res.redirect("/")
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

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Seller.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
          return res.redirect("/api/sellers")
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all products from the database.
exports.deleteAll = (req, res) => {
  Seller.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
