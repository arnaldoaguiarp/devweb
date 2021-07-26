module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE
    },
    quantity: {
      type: Sequelize.DOUBLE
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return Product;
};