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
      validate: {
        isUnique: async (value, next) => {
          try {
            const isUsernameExists = await Users.findOne({ where: { username: value }});

            if(isUsernameExists){
              return next("Username is already in use!");
            }

            next();
          }
          catch(err){
            return next(err);
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUnique: async (value, next) => {
          try {
            const isExists = await Users.findOne({
              where: { email: value },
              attributes: ["userID"],
            });

            if(isExists){
              return next("Email is already in use!")
            }

            next();
          } catch (err) {
            return next(err);
          }
        },
      },
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
