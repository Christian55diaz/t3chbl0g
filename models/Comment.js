//comment model requirements
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blog",
        key: "id",
      },
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this basically makes the comments short basically only allows 32 characters max might be too short for real life but for this setting it is perfect for me
        // because I just want the comments to be short in nature
        len: [3, 32],
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;

