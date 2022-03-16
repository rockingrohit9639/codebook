module.exports = (sequelize, DataTypes) => {
  const Friendships = sequelize.define("friendship", {
    friendshipID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: [[-1, 0, 1]],
      },
    },
  });

  return Friendships;
};
