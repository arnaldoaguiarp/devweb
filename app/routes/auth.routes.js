const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signupSeller",[verifySignUp.checkDuplicateEmail],controller.signupSeller);
  app.post("/api/auth/signupClient",[verifySignUp.checkDuplicateEmail],controller.signupClient);
  app.post("/api/auth/signupAdmin",[verifySignUp.checkDuplicateEmail],controller.signupAdmin);

  app.get("/login",controller.login);
  
  app.get("/cadastro/loja", controller.cadastroSeller);
  app.get("/cadastro/cliente", controller.cadastroClient);

  app.get("/api/auth/signout", controller.signout);
};
