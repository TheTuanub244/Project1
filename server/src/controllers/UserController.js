const { json } = require("body-parser");
var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const handleSignIn = async (req, res) => {
  const receivedToken = req.body.token;
  return res.status(200).json({
    receivedToken,
  });
};
module.exports = {
  handleSignIn: handleSignIn,
};
