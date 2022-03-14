// importing the requirements
const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
// trying to finall blogpost routes
router.get("/", (req, res) => {
    Blog.findAll({
      attributes: ["id", "title", "created_at", "blog_content"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "blog_id",
            "user_id",
            "created_at",
          ],
        },
        {
            model: User,
            attributes: ["username"],
          },
        ],
      })
       // dbData is b/c I am using multiple models at once
    .then((dbData) => {
        const Blog = dbData.map((Blog) => Blog.get({ plain: true }));
        res.render("homepage", {
          Blog,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  //router.get login
  router.get("/login", (req, res) => {
    // already loggedin go to homepage
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("login");
  });
  //router.get signup
  router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("signup");
  });
  //findone blogpost by id
  router.get("/blogpost/:id", withAuth, (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "blog_content"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "blog_id",
            "user_id",
            "created_at",
          ],
          // for the comments
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        // username of blog's author
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
    //here we return an error if no post is found with id
    .then((dbBlogData) => {
        if (!dbBlogData) {
          res.status(404).json({ message: "Post not found with id" });
          return;
        }
        //data is allowed to be passed through to website
        const Blog = dbBlogData.get({ plain: true });

         // once the data is useable then I can pass it into the handlebars template that I made
      res.render("blog", {
        Blog,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
