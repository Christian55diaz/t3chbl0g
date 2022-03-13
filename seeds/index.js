//index for seeds
//setup consts
const sequelize= require('../config/connection');
const seedComment= require('./commentData');
const seedBlog= require('./blogData');
const seedUser= require('./userData');

//seeding all the models
const seedAll = async () => {
    await sequelize.sync({ force: true });