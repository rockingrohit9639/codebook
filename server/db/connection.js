const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("codebook", "root", "", {
  host: "",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("DB Connection Success"))
  .catch((err) => console.log(err));

sequelize
  .sync({ force: true })
  .then(() => console.log("Re-Sync with database"))
  .catch((err) => console.log(err));

const db = {};

db.sequelize = sequelize;
db.users = require("./models/User")(sequelize, DataTypes);

module.exports = db;