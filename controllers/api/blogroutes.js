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