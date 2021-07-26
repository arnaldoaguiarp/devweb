const express = require("express");
const cors = require("cors");
var session = require('express-session');
const app = express();
app.use(session({secret:'XASDASDA'}));
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
/*
//Serve para dropar o banco
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/product.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/seller.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/home.routes")(app);

app.set('view engine', 'ejs');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});