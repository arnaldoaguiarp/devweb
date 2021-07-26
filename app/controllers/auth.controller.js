const db = require("../models");
const config = require("../config/auth.config");
const Client = db.clients;
const Seller = db.sellers;
const Admin = db.admins;

var jwt = require("jsonwebtoken");

exports.signupClient = (req, res) => {
  ssn = req.session; 

  // Save User to Database
  Client.create({
    nome: req.body.nome,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email,
    senha: req.body.senha
  })
    .then((client) => {
      jwt.sign({ id: client.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      ssn.client_id = client.id
      ssn.tipo_user = "client"
      res.redirect("/")
    }
    )
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
};

exports.signupAdmin = (req, res) => {
  // Save User to Database
  ssn = req.session; 

  Admin.create({
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email,
    senha: req.body.senha,
    nome: req.body.nome
  })
    .then((e) => {
      return res.status(202).send({ message: "deu bom" })
    }
    )
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
};

exports.signupSeller = (req, res) => {
  // Save User to Database
  ssn = req.session; 

  // utilizar bcrypt futuramente
  Seller.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    telefone: req.body.telefone,
    cnpj: req.body.cnpj
  })
    .then((seller) => {
      jwt.sign({ id: seller.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      ssn.seller_id = seller.id
      ssn.tipo_user = "seller"
      res.redirect("/api/products/" + ssn.seller_id)
    }
    )
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  ssn = req.session; 

  Client.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(client => {
      if (client) {
        if (req.body.senha != client.senha) {
          return res.status(404).send({ message: "User Not found" })
        } else {
          const accessToken = jwt.sign({ id: client.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          ssn.client_id = client.id
          ssn.tipo_user = "client"
          res.redirect("/")
        }

      }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  Seller.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(seller => {
      if (seller) {
        if (req.body.senha != seller.senha) {
          return res.status(404).send({ message: "Seller Not found" })
        } else {
          jwt.sign({ id: seller.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          ssn.seller_id = seller.id
          ssn.tipo_user = "seller"
          res.redirect("/api/products/" + ssn.seller_id)
        }

      }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  Admin.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(admin => {
      if (admin) {
        if (req.body.senha != admin.senha) {
          return res.status(404).send({ message: "Admin Not found" })
        } else {
          const accessToken = jwt.sign({ id: admin.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          return res.redirect("/api/admins/index?token="+accessToken)
          // return res.status(200).send({ message: "isso daí Admin, logado", accessToken })
        }

      }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.signout = (req, res) => {
  res.render('../views/pages/about')
};

exports.login = (req, res) => {
  res.render('../views/pages/login/login')
};

exports.cadastroSeller = (req, res) => {
  res.render('../views/pages/cadastro/seller')
};

exports.cadastroClient = (req, res) => {
  res.render('../views/pages/cadastro/client')
};
