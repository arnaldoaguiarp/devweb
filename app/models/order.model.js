// order.model.js
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      status: {
        type: Sequelize.STRING
      }
    });
    return Order;
  };

  /*
  **CONTROLLER**
  const pedido = {
    buy_date: req.body.buy_date,
    vendedor: req.body.vendedor,
    usuario: req.body.usuario,
    status: req.body.status
  };

  **BANCO DE DADOS**
    data_comptra DATETIME,
    id_vendedor int,
    id_cliente int,
    status varchar(255),
    FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_vendedor),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
  */