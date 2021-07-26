// order.routes.js
module.exports = app => {
    const orders = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
    //Parte de order
    // Create a new order
    router.post("/", orders.create);
  
    // Retrieve all orders
    router.get("/", orders.findAll);
  
    // Retrieve a single order with id
    router.get("/:id", orders.findOne);
  
    // Update a order with id
    router.put("/:id", orders.update);
  
    // Delete a order with id
    router.delete("/:id", orders.delete);
  
    // Delete all orders
    router.delete("/", orders.deleteAll);
  
    app.use('/api/orders', router);
  };