// residence.routes.js
module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();
    //Parte de cart
    // Create a new cart
    router.post("/", carts.create);
  
    // Retrieve all carts
    router.get("/", carts.findAll);
  
    // Retrieve a single cart with id
    router.get("/:id", carts.findOne);
  
    // Update a cart with id
    router.put("/:id", carts.update);
  
    // Delete a cart with id
    router.delete("/:id", carts.delete);
  
    // Delete all carts
    router.delete("/", carts.deleteAll);
  
    app.use('/api/carts', router);
  };