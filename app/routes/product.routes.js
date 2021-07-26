module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();
  
  // Create a new product
  router.post("/:seller", products.create);

  // Retrieve all products
  router.get("/:seller", products.home);

  // Retrieve a single product with id
  router.get("/:seller/edit/:id", products.edit);

  // Retrieve a single product with id
  router.get("/:seller/new", products.new);

  // Update a product with id
  router.post("/update/:id", products.update);

  app.use('/api/products', router);
};