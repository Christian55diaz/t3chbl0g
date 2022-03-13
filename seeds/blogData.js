//blog seeds
const { Blog } = require('../models');
//setup for blogData seeds
const blogData =  [
    {
      title: "Looks like you stumbled upon my T3chbl0g",
      blog_content: "Don't be shy check out the site, sign up make a post, comment, delete a comment or post. I insist you try all the functionalities!",
      user_id: 1
    },
    {
      title: "Fornite Moncler Skins",
      blog_content: "Do not tell me you never played Fortnite because you are lying. Fornite has a limited offer on Moncler skins. Do not miss out on a Moncleazy!!",
      user_id: 2
    },
    {
      title: "Snoop Dogg is a Faze Member",
      blog_content: "Believe it or not Snoop Dogg or should i say Faze Snoop is now a member of the Faze clan. Not too sure what content he will bring but I cannot wait to find out.",
      user_id: 3
    },
    {
      title: "The only way to play GTA 5",
      blog_content: "Ever heard of fiveM? No i guessed it, well let me tell you it is an application where you can join loads of servers that have their own and unique versions of the gta map. Some are roleplays servers and some are even wager servers!",
      user_id: 4
    }
  ];
  //bulkcreat blogData
  const seedBlog = () => Blog.bulkCreate(blogData);
//export Blog seeds
module.exports = seedBlog;