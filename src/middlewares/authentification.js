const jwt = require("jsonwebtoken");
const User = require("../models/user");
const tokensecret = process.env.TOKEN_SECRET;

const authentification = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(authToken, tokensecret);
    const user = await User.findOne({
      _id: decodedToken._id,
      //isAdmin: decodedToken.isAdmin,
    });
    if (!user || !user.isAdmin) {
      console.log("Vous n'avez pas les droits");
    } //throw new Error();
    req.authToken = authToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Merci de vous authentifier!");
  }
};

module.exports = authentification;
