// order.controller.js

const db = require("../models");
const Order = db.orders;
const Residence = db.residences;
const Cart = db.carts;

// Create and Save a new Order
exports.create = (req, res) => {

  if (ssn == undefined && ssn.client_id == undefined) {
    return res.redirect("/login")
  }
  // Create a Order/Pedido
  const pedido = {
    clientId: parseInt(ssn.client_id),
    status: 'pendente'
  };
  
  Order.create(pedido).then(data => {
    var i = 1;
  
    while (true) {
      if (req.body[`produto_id_${i}`] == undefined) {
        break;
      }

      const dados = {
        productId: parseInt(req.body[`produto_id_${i}`]) ,
        orderId:  parseInt(data.dataValues.id),
        valor_total: req.body[`valor_total_${i}`],
        quantidade: req.body[`quantidade_${i}`] 
      };
      Cart.create(dados)
      i++;
    }

    res.render('../views/pages/home/checkout', {
      order_id: data.dataValues.id
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Order."
    });
  });
 
};

exports.checkout = (req, res) => {
  const id = req.params.id;

  Order.update({state: 'aprovado'}, {
    where: { id: id }
  })

  const local = {
    city: req.body.city,
    street: req.body.street,
    complement: req.body.complement,
    state: req.body.state,
    number: req.body.number,
    orderId: id
  };

  Residence.create(local)
    .then(data => {
      res.redirect("/api/orders/cliente")
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
};

exports.seller = (req, res) => {
  const { QueryTypes } = require('sequelize');
  db.sequelize.query(`
  SELECT
    o.id as id,
    cl.nome as nome,
    cl.email as email,
    GROUP_CONCAT(CONCAT('[',c.valor_total, '-', c.quantidade, '-', c.productId,']' ))  as carrinho
    From orders o
        Join carts c on c.orderID = o.id
        Join products p on c.productId = p.id 
        Join sellers s on p.sellerId  = s.id
        Join clients cl on cl.id = o.clientId 
    WHERE 
      s.id = ${ssn.seller_id}
    group by
    o.id`, {
    nest: true,
    type: QueryTypes.SELECT
  })
  .then(data => {
    res.render('../views/pages/loja/pedido/show', {
      orders: data,
      seller: ssn.seller_id
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}

exports.client = (req, res) => {
  const { QueryTypes } = require('sequelize');
  db.sequelize.query(`
  SELECT
    o.id as id,
    GROUP_CONCAT(CONCAT('[',c.valor_total, '-', c.quantidade, '-', c.productId,']' ))  as carrinho
    From orders o
        Join carts c on c.orderID = o.id
        Join clients cl on cl.id = o.clientId 
    WHERE 
      cl.id = ${ssn.client_id}
    group by
    o.id`, {
    nest: true,
    type: QueryTypes.SELECT
  })
  .then(data => {
    res.render('../views/pages/home/pedidos', {
      orders: data
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}