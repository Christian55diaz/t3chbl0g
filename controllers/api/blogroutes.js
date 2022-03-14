// importing the requirements
const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//get everything and anything that has to do with blog post
router.get("/", (req, res) => {
    Blog.findAll({
      attributes: ["id", "title", "created_at", "blog_content"],
      order: ["created_at"],
      include: [
        // we need both comments and user because they are associated with blog post
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
      //   catching error in the database if needed
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  //we are finding one specific post by its id
  router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "blog_content"],
      include: [
         // we need both comments and user because they are associated with blog post
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "blog_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })
      //  catching error in the database if needed
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: "no blog post found with this id" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  //create blog post
  router.post("/", withAuth, (req, res) => {
    Blog.create({
        //require title,content, and user id
      title: req.body.title,
      blog_content: req.body.blog_content,
      user_id: req.session.user_id,
    })
      .then((dbBlogData) => res.json(dbBlogData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // updating blog by its id
router.put("/:id", withAuth, (req, res) => {
    Blog.update(
      {
        title: req.body.title,
        blog_content: req.body.blog_content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbBlogPostData) => {
        if (!dbBlogPostData) {
          res
            .status(404)
            .json({ message: "no id found with this post" });
          return;
        }
        res.json(dbBlogPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // this blog post will get deleted and destryoyed
  // defintetly not the best practice for a blog like this but wanted to try it out
router.delete("/:id", withAuth, (req, res) => {
    Blog.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbBlogPostData) => {
        if (!dbBlogPostData) {
          res.status(404).json({ message: "post not found with this id" });
          return;
        }
        res.json(dbBlogPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  //never forget to export
  module.exports = router;