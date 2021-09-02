module.exports = {
  HOST: "us-cdbr-east-04.cleardb.com",
  USER: "b7bedf97af929c",
  PASSWORD: "7fd4a3fb",
  DB: "heroku_f8ce1b1909d40a9",
  dialect: "mysql",
  PORT: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
//mysql://b7bedf97af929c:7fd4a3fb@us-cdbr-east-04.cleardb.com/heroku_f8ce1b1909d40a9?reconnect=true