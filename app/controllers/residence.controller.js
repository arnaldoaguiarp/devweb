// residence.controller.js

const db = require("../models");
const Residence = db.residences;
const Op = db.Sequelize.Op;

// Create and Save a new Residence
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

 
  // Create a Adress
  const adress = {
    order: req.body.order,
    pedido: req.body.pedido,
    state: req.body.status,
    city: req.body.city,
    street: req.body.street,
    number: req.body.number,
    complement: req.body.complement
  };
  /*
    id_order int,
	FOREIGN KEY (id_order) REFERENCES pedido(id_order),
	estado varchar(255),
	cidade varchar(255),
	rua varchar(255),
    numero varchar(255),
    complemento varchar(255)
  */

  // Save Residence in the database
  Residence.create(adress)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Residence."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const title = req.query.usuario;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Residence.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Residences."
      });
    });
};

// Find a single Residence with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Residence.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Residence with id=" + id
      });
    });
};

// Update a Residence by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Residence.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Residence was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Residence with id=${id}. Maybe Residence was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Residence with id=" + id
      });
    });
};

// Delete a Residence with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Residence.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Residence was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Residence with id=${id}. Maybe Residence was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Residence with id=" + id
      });
    });
};

// Delete all products from the database.
exports.deleteAll = (req, res) => {
  Residence.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Residences were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Residences."
      });
    });
};
