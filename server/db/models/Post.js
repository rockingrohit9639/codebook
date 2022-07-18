module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "post",
    {
      postID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      imgURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postTitle: {
        type: DataTypes.STRING,
        defaultValue: "Code by Codebook",
      },
      codeSnippet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["postTitle", "codeSnippet"],
        },
      ],
    }
  );

  return Posts;
};
