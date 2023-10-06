const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokensecret = process.env.TOKEN_SECRET;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("Email non valide!");
    },
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  /*authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],*/
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.authTokens;
  delete user.__v;
  return user;
};
userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign(
    { _id: this._id.toString(), isAdmin: this.isAdmin },
    tokensecret
  );
  await this.save();
  return authToken;
};

userSchema.statics.findUser = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      console.log("pas pareil");
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
