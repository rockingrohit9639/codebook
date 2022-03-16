module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("post", {
    postID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncreament: true,
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postTitle: {
      type: DataTypes.STRING,
      defaultValue: "Code by Codebook",
    },
  });

  return Posts;
};
