module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    commentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncreament: true,
    },
    body: DataTypes.STRING,
  });

  return Comments;
};
