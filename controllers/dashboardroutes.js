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