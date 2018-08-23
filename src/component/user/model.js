const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const { Schema } = mongoose;

let User = null;

const UserSchema = new Schema(
  {
    accountName: { type: String },
    country: { type: String },
    mobile: { type: String },
    userName: { type: String }
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdated: "lastUpdated" }
  }
);

/**
 * create access token with expire limits
 */
UserSchema.statics.encode = async (data) => {
  console.log("config.token.TOKEN_SECRET", config.token.TOKEN_SECRET);
  try {
    let createdToken = await jwt.sign(data, config.token.TOKEN_SECRET, { expiresIn: config.token.EXPIRY });
    return createdToken;
  } catch (err) {
    return err;
  }
};
/**
 * fetch user details from access token
 * also check token is valid or not
 */
UserSchema.statics.decode = async (token) => {
  try {
    let decoded = await jwt.verify(token, config.token.TOKEN_SECRET);
    return decoded
  } catch (err) {
    return false;
  }
}

User = mongoose.model("User", UserSchema);

module.exports = User;
