const db = require("../models");
const Client = db.clients;
const Admin = db.admins;
const Seller = db.sellers;

checkDuplicateEmail = (req, res, next) => {
  // Username
  Client.findOne({
    where: {
      email: req.body.email
    }
  }).then(clients => {
    if (clients) {
      res.status(400).send({
        message: "Failed! email is already in use!"
      });
      return;
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
  Seller.findOne({
    where: {
      email: req.body.email
    }
  }).then(seller => {
    if (seller) {
      res.status(400).send({
        message: "Failed! email is already in use in Seller!"
      });
      return;
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
  Admin.findOne({
    where: {
      email: req.body.email
    }
  }).then(admin => {
    if (admin) {
      res.status(400).send({
        message: "Failed! email is already in use in Admin!"
      });
      return;
    }
      next();
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};
  
const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;