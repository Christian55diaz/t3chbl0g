// importing the needed dependencies
const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  BlogPost.findAll({
    where: {
      // get the user from the session that way they are able to create a blog post
      // this will be done when I want the user to access something
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at", "blog_content"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "blogpost_id",
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
    // using more than one of the models so I am saying with this var my data is coming from the db
    .then((dbData) => {
      // makes the data useable that way I can display it properly on the website
      // felt like I should probably keep this consistent and call the vars im mapping out the same as the
      // const that way it makes sense readibility wise
      const blogPosts = dbData.map((blogPosts) =>
        blogPosts.get({ plain: true })
      );
      res.render("dashboard", { blogPosts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit-blogpost/:id", withAuth, (req, res) => {
  BlogPost.findOne({
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
          "blogpost_id",
          "user_id",
          "created_at",
        ],
        // need this for comments that way the username will show up
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    // same as above I am keeping this more generic that way you can see i am getting the data from the db
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: "No blog post was found with this id" });
        return;
      }

      // same concept as above making the data useable that way I can display it on the website
      const blogPost = dbData.get({ plain: true });

      res.render("edit-blogpost", {
        blogPost,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create-blogpost/", withAuth, (req, res) => {
  BlogPost.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at", "blog_content"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "blogpost_id",
          "user_id",
          "created_at",
        ],
      },
    ],
  })
    // again keeping this more generic since I am using more than one model
    .then((dbData) => {
      const blogPosts = dbData.map((blogPost) => blogPost.get({ plain: true }));
      res.render("create-blogpost", { blogPosts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;