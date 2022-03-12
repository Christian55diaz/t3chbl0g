//comment model requirements
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//comment model created
class Comment extends Model {}

Comment.init(
    {
        //id of the comment
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          //comment from the user
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "user",
              key: "id",
            },
        },
        //comment text requirements 
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              // validating the comments for a certian length instead of them being super long we have a good character range from 2-40
              len: [2, 40],
            },
          },
    },
    {
        //adding sequelize
     sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
    }
);
//exporting
module.exports = Comment;

