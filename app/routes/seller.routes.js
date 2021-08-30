// sellers.routes.js
module.exports = app => {
  const sellers = require("../controllers/seller.controller.js");

  var router = require("express").Router();
  //Parte de produto
  // Create a new seller
  router.post("/", sellers.create);

  // Retrieve all sellers
  router.get("/", sellers.findAll);

  // Retrieve a single seller with id
  router.get("/:id", sellers.findOne);

  router.get("/edit/:id", sellers.edit);
  router.post("/edit/:id", sellers.update);
  router.get("/delete/:id", sellers.delete);

  // Update a seller with id
  router.put("/:id", sellers.update);

  // Delete a seller with id
  router.delete("/:id", sellers.delete);

  // Delete all sellers
  router.delete("/", sellers.deleteAll);

  app.use('/api/sellers', router);
};