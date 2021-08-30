// client.routes.js
module.exports = app => {
  const client = require("../controllers/client.controller.js");

  var router = require("express").Router();
  //Parte de produto
  // Create a new client
  router.post("/", client.create);

  // Retrieve all clients
  router.get("/", client.findAll);

  // Retrieve a single client with id
  router.get("/:id", client.findOne);

  // Update a client with id
  router.get("/edit/:id", client.edit);
  router.post("/edit/:id", client.update);

  // Delete a client with id
  router.get("/delete/:id", client.delete);

  // Delete all clients
  router.delete("/", client.deleteAll);

  app.use('/api/clients', router);
};