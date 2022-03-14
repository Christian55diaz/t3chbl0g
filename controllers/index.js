//main index
//import router +routes
const router = require("express").Router();
const userRoutes = require("./userroutes");
const commentRoutes = require("./comment-routes");
const blogPostRoutes = require("./blogroutes");
//api routes -->
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);

module.exports = router;