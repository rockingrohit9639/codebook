module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["male", "female"]],
      },
    },
    photoURL: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: "Lemme show my code on Codebook",
    },
    DOB: DataTypes.DATEONLY,
  });

  return Users;
};
