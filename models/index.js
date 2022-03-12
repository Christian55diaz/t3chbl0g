//index
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//here we are going to make one to one and one to many relationships

User.hasMany(Blog, {
    foriegnkey: 'user_id'
});
Blog.belongsTo(User, {
    foriegnkey: 'user_id'
});