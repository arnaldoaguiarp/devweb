const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize, Sequelize);
db.clients = require("./client.model.js")(sequelize, Sequelize);
db.sellers = require("./seller.model.js")(sequelize, Sequelize);
db.admins = require("./admin.model.js")(sequelize, Sequelize);
db.carts = require("./cart.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.residences = require("./residence.model.js")(sequelize, Sequelize);

db.sellers.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.sellers, {
  foreignKey: "sellerId",
  as: "seller",
});

db.clients.hasMany(db.orders, { as: "orders" });
db.orders.belongsTo(db.clients, {
  foreignKey: "clientId",
  as: "client",
});

db.orders.hasMany(db.carts, { as: "carts" });
db.carts.belongsTo(db.orders, {
  foreignKey: "orderId",
  as: "order",
});

db.orders.hasOne(db.residences, { as: "residences" });
db.residences.belongsTo(db.orders, {
  foreignKey: "orderId",
  as: "order",
});

module.exports = db;