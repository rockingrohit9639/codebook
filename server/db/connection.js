const Sequelize = require("sequelize");

const sequelize = new Sequelize("codebook", "root", "", {
  host: "",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("DB Connection Success"))
  .catch((err) => console.log(err));