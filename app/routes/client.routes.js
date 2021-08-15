// client.routes.js
module.exports = app => {
  const client = require("../controllers/client.controller.js");

  var router = require("express").Router();
  //Parte de produto
  // Create a new product
  router.post("/", client.create);

  // Retrieve all products
  router.get("/", client.findAll);

  // Retrieve a single product with id
  router.get("/:id", client.findOne);

  // Update a product with id
  router.get("/edit/:id", client.edit);
  router.post("/edit/:id", client.update);

  // Delete a product with id
  router.get("/delete/:id", client.delete);

  // Delete all products
  router.delete("/", client.deleteAll);

  app.use('/api/clients', router);
};