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
        
    }
)
