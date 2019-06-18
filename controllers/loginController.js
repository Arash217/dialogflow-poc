const passport = require("passport");

const get = async (req, res) => {
  res.render("login", { layout: "authentication" });
};

const post = async (req, res, next) => {
  return passport.authenticate("local", async (error, account) => {
    if (account) {
      req.login(account, () => {
        return res.redirect("/lijsten");
      });
      return;
    }
    res.status(400).render("login", {
      body: req.body,
      error
    });
  })(req, res, next);
};

module.exports = {
  get,
  post
};
