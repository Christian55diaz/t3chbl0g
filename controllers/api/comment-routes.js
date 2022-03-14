// importing the requirements
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//get all comments
router.get("/", (req, res) => {
    Comment.findAll()
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  //post comment router
router.post("/", withAuth, (req, res) => {
    // is user still logged into session
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        blogpost_id: req.body.blogpost_id,
        // use the user's id from the session
        user_id: req.session.user_id,
      })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

  //to delete the comments here
  router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
      where: {
        blogpost_id: req.params.id,
      },
    })
      .then((dbCommentData) => {
        if (!dbCommentData) {
          res
            .status(404)
            .json({ message: "no comment found with id" });
          return;
        }
        res.json(dbCommentData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // exporting comment router
  module.exports = router;