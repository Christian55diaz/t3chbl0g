// importing the needed dependencies
const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//router get 
router.get("/", withAuth, (req, res) => {
    //find all blogposts
    Blog.findAll({
        where: {
          //user from session so user can create post
          user_id: req.session.user_id,
        },
        //alot of the routes are re-use from other projects just different wording
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
      //database data
      .then((dbData) => {
        //allows for better displaying on website
        //mapping the blogs allows for easier database storage and accessability
        const Blog = dbData.map((blog) =>
          blog.get({ plain: true })
        );
        res.render("dashboard", { Blog, loggedIn: true });
    })
    //catch and return if there is an error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//router.get
router.get("/edit-blog/:id", withAuth, (req, res) => {
//findout blog by id
Blog.findOne({
    where: {
        id: req.params.id,
      },
      //most of this code is used over and over
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
          // need for comments
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })
})
.then((dbData) => {
    if (!dbData) {
      res
        .status(404)
        .json({ message: "No blog post was found with this id" });
      return;
    }