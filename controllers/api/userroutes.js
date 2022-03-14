// importing the requirements
const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get allusers
router.get("/", (req, res) => {
    User.findAll({
      attributes: { exclude: ["password"] },
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // get user by its id
  router.get("/:id", (req, res) => {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: BlogPost,
          attributes: ["id", "title", "blog_content", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    })
    //if error then
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "user not found with id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  //signup routes
  //most code used from a group project i did called mus-it
  router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }).then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    });
  });
  //login route
  //same here used code from previous projects
  router.post("/login", (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "user not found with id" });
          return;
        }
        const validPW = dbUserData.checkPassword(req.body.password);
  
        if (!validPW) {
          res.status(400).json({ message: "password is invalid" });
          return;
        }
        // this just saves the data you need to the cookie that I set in the beggining of the start of the server
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
  
          res.json({ user: dbUserData, message: "Welcome, you are logged-in!" });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });