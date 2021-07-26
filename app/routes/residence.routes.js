// residence.routes.js
module.exports = app => {
    const residences = require("../controllers/residence.controller.js");
  
    var router = require("express").Router();
    //Parte de residence
    // Create a new residence
    router.post("/", residences.create);
  
    // Retrieve all residences
    router.get("/", residences.findAll);
  
    // Retrieve a single residence with id
    router.get("/:id", residences.findOne);
  
    // Update a residence with id
    router.put("/:id", residences.update);
  
    // Delete a residence with id
    router.delete("/:id", residences.delete);
  
    // Delete all residences
    router.delete("/", residences.deleteAll);
  
    app.use('/api/residences', router);
  };