// admin.routes.js
module.exports = app => {
  const admin = require("../controllers/admin.controller.js");

  var router = require("express").Router();
  //Parte de produto
  // Create a new product
  // router.post("/", admin.create);
  router.get("/index", admin.index);

  // Retrieve all products
  router.get("/", admin.findAll);

  // Retrieve a single product with id
  router.get("/:id", admin.findOne);

  // Update a product with id
  router.put("/:id", admin.update);

  // Delete a product with id
  router.delete("/:id", admin.delete);

  // Delete all products
  router.delete("/", admin.deleteAll);

  app.use('/api/admins', router);
};