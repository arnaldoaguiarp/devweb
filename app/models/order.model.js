// order.model.js
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      status: {
        type: Sequelize.STRING
      }
    });
    return Order;
  };
