//blog model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//blog model created
class Blog extends Model {}

Blog.init(
    {
        //blog id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            //cascade means child data gets deleted when the parent data is deleted
            onDelete: 'CASCADE'
          },
          //title of blog post
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
    }
)