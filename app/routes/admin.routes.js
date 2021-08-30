// admin.routes.js
module.exports = app => {
  const admin = require("../controllers/admin.controller.js");

  var router = require("express").Router();
  //Parte de produto
  // Create a new admin
  //router.post("/", admin.create);
  
  // Show index admin
  router.get("/index", [admin.index]);

  // Retrieve all admins
  router.get("/", admin.findAll);

  // Retrieve a single admin with id
  router.get("/:id", admin.findOne);

  // Update a admin with id
  router.put("/:id", admin.update);

  // Delete a admin with id
  router.delete("/:id", admin.delete);

  // Delete all admins
  router.delete("/", admin.deleteAll);

  app.use('/api/admins', router);
};