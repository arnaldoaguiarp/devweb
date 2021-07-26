// cart.model.js
module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      quantidade: {
          type: Sequelize.STRING
      },
      valor_total: {
        type: Sequelize.STRING
      }
    });
    return Cart;
  };


/*
**CONTROLLER**
const carrinho = {
    produto: req.body.produto,
    pedido: req.body.pedido,
    quantidade: req.body.quantidade,
    valor_total: req.body.valor_total,
};
 
**BANCO DE DADOS**
id_produto int,
FOREIGN KEY (id_order) REFERENCES pedido(id_order),
FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
quantidade int,
valor_total float(10)
*/