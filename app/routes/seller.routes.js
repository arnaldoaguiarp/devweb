// sellers.routes.js
module.exports = app => {
  const sellers = require("../controllers/seller.controller.js");

  var router = require("express").Router();
  //Parte de produto
  // Create a new product
  router.post("/", sellers.create);

  // Retrieve all products
  router.get("/", sellers.findAll);

  // Retrieve a single product with id
  router.get("/:id", sellers.findOne);

  router.get("/edit/:id", sellers.renderUpdate);
  router.post("/edit/:id", sellers.update);
  router.get("/delete/:id", sellers.delete);

  // Update a product with id
  router.put("/:id", sellers.update);

  // Delete a product with id
  router.delete("/:id", sellers.delete);

  // Delete all products
  router.delete("/", sellers.deleteAll);

  app.use('/api/sellers', router);
};