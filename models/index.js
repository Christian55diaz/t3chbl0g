//index
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//here we are going to make one to one and one to many relationships
//one to many
User.hasMany(Blog, {
    foriegnkey: 'user_id'
});
//one to one
Blog.belongsTo(User, {
    foriegnkey: 'user_id'
});
//one to one
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
//one to one
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id', 
});
//one to many
User.hasMany(Comment, {
    foreignKey: 'user_id',
  });
  //one to many
  Blog.hasMany(Comment, {
    foreignKey: 'post_id'
});