const jwt = require("jsonwebtoken");
const moment = require("moment");

const generateToken = (
  user,
  expires,
  secret = process.env.ACCESS_TOKEN_KEY
) => {
  const payload = {
    user,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(30, "minutes");
  const accessToken = generateToken(user, accessTokenExpires);

  return accessToken;
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
