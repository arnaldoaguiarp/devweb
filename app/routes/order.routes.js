// order.routes.js
module.exports = app => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();
  //Parte de order
  // Create a new order
  router.post("/", orders.create);
  router.post("/checkout/:id", orders.checkout);

  // Retrieve all orders
  router.get("/cliente", orders.client);
  // Retrieve a single order with id
  router.get("/vendedor", orders.seller);

  app.use('/api/orders', router);
};