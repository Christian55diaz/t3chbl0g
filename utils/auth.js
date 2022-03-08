//authorization make sure everyone using my tech blog is authorized to do so like they have to have an account to actually use the tech blog
const withAuth = (req, res, next) => {
    // dont have an account(Not auth) you will be brought to login/signup page to make one
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // right here we are you a call function(next) so that if you are authorize you will be good to go
      next();
    }
  };
  
  module.exports = withAuth;