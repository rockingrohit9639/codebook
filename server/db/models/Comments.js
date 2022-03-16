module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "comments",
    {
      commentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      body: DataTypes.STRING,
    },
    { updatedAt: false }
  );

  return Comments;
};
