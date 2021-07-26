// admin.model.js
module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
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
  return Admin;
};