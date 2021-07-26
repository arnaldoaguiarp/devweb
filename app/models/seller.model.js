// seller.model.js
module.exports = (sequelize, Sequelize) => {
  const Seller = sequelize.define("seller", {
    nome: {
      type: Sequelize.STRING
    },
    cnpj: {
      type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    }
  });
  return Seller;
};