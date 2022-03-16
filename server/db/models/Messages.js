module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "messages",
    {
      messageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      body: DataTypes.STRING,
    },
    { updatedAt: false }
  );

  return Messages;
};
