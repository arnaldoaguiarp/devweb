// client.model.js
module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    nome: {
      type: Sequelize.STRING
    },
    cpf: {
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
  return Client;
};