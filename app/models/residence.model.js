module.exports = (sequelize, Sequelize) => {
  const Residence = sequelize.define("residence", {
    state: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    number: {
      type: Sequelize.STRING
    },
    complement: {
      type: Sequelize.STRING
    }
  });
  return Residence;
};
