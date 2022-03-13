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
          contents: {
            type: DataTypes.STRING,
            allowNull: false
            //here we could validate and make sure url is true but we do not need too.
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
                //we refrence user model plus the key is the id by association
              model: 'user',
              key: 'id'
            }
          }
        },
    {
        //sequelize
        sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'blog'
    }
);

module.exports = Blog;
