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
  .sync({ force: false })
  .then(() => console.log("Re-Sync with database"))
  .catch((err) => console.log(err));

const db = {};

db.sequelize = sequelize;
db.users = require("./models/User")(sequelize, DataTypes);
db.posts = require("./models/Post")(sequelize, DataTypes);
db.friendships = require("./models/Friendships")(sequelize, DataTypes);

// ---------- USER AND POST RELATIONSHIP START----------
db.users.hasMany(db.posts, { foreignKey: "userID" });
db.posts.belongsTo(db.users, { foreignKey: "userID" });
// ---------- USER AND POST RELATIONSHIP END----------

// ---------- USER AND FRIENDSHIPS RELATIONSHIP START----------
db.users.belongsToMany(db.users, { as: "receiver", foreignKey: "receiverID", through: "friendship",  })
db.users.belongsToMany(db.users, { as: "sender", foreignKey: "senderID", through: "friendship",  })

module.exports = db;