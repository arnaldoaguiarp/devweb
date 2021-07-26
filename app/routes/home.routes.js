const controller = require("../controllers/home.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/about", controller.about);
  app.get("/", controller.index);
  app.get("/product/:id", controller.product);
  app.get("/store", controller.store);
  app.get("/cart", controller.cart);

};
