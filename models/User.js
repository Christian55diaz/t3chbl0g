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