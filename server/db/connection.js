const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("codebook", "root", "", {
  host: "",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("DB Connection Success"))
  .catch((err) => console.log(err));

const forceSync = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (err) {
    console.log(err);
  }
};

forceSync();

// sequelize
//   .sync({ force: true })
//   .then(() => console.log("Re-Sync with database"))
//   .catch((err) => console.log(err));

const db = {};

db.sequelize = sequelize;
db.users = require("./models/User")(sequelize, DataTypes);
db.posts = require("./models/Post")(sequelize, DataTypes);
db.friendships = require("./models/Friendships")(sequelize, DataTypes);
db.comments = require("./models/Comments")(sequelize, DataTypes);
db.likes = require("./models/Likes")(sequelize, DataTypes);

// ---------- USER AND POST RELATIONSHIP START----------
db.users.hasMany(db.posts, { foreignKey: "userID" });
db.posts.belongsTo(db.users, { foreignKey: "userID" });
// ---------- USER AND POST RELATIONSHIP END----------

// ---------- USER AND FRIENDSHIPS RELATIONSHIP START----------
db.users.belongsToMany(db.users, {
  as: "receiver",
  foreignKey: "receiverID",
  through: "friendship",
});
db.users.belongsToMany(db.users, {
  as: "sender",
  foreignKey: "senderID",
  through: "friendship",
});
// ---------- USER AND FRIENDSHIPS RELATIONSHIP END----------

// ---------- USER, POST AND COMMENTS RELATIONSHIP START----------
db.users.hasMany(db.comments, { foreignKey: "userID" });
db.comments.belongsTo(db.users, { foreignKey: "userID" });

db.posts.hasMany(db.comments, { foreignKey: "postID" });
db.comments.belongsTo(db.posts, { foreignKey: "postID" });
// ---------- USER, POST AND COMMENTS RELATIONSHIP END----------

// ---------- USER, POST AND LIKES RELATIONSHIP START----------
db.users.hasMany(db.likes, { foreignKey:  "userID"});
db.likes.belongsTo(db.users, { foreignKey: "userID" });

db.posts.hasMany(db.likes, { foreignKey: "postID"});
db.likes.belongsTo(db.posts, { foreignKey: "postID" })
// ---------- USER, POST AND LIKES RELATIONSHIP END----------

module.exports = db;
