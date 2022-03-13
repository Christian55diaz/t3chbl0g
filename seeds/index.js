//index for seeds
//setup consts
const sequelize= require('../config/connection');
const seedComment= require('./commentData');
const seedBlog= require('./blogData');
const seedUser= require('./userData');

//seeding all the models
const seedAll = async () => {
    await sequelize.sync({ force: true });
//user seeded
    await seedUser();
  console.log('\n----- USER SEEDED -----\n');
//blog seeded
  await seedBlog();
  console.log('\n----- BLOG SEEDED -----\n');
//comments seeded
  await seedComment();
  console.log('\n----- COMMENTS SEEDED -----\n');
  process.exit(0);
};

//make sure to seedAll
seedAll();