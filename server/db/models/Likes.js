module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "likes",
    {
      likeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncreament: true,
      },
    },
    { timestamps: false }
  );
  return Likes;
};
