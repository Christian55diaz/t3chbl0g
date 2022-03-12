//user model
//require bcrypt for hasing library
const bcrypt = require('bcrypt');

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

//user model which is also used for user table
class User extends Model {
    //method to run(per user) to check passwords
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//we set up our user models for our database
User.init(
    {
        //id column
        id: {
            //specifcy what type of data this is with DataTypes 
            type: DataTypes.INTEGER,
            //sql version of saying not null
            allowNull: false,
            //primary key
            primaryKey: true,
            //turning on auto-increment
            autoIncrement: true
        },
        //lets make a username column
    }
)