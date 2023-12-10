import UserService from "../services/UserService";
const handleSignIn = async (req, res) => {
  const receivedToken = req.body.token;
  const respone = await UserService.checkSignIn(receivedToken);
  return res.status(200).json({
    respone,
  });
};
module.exports = {
  handleSignIn: handleSignIn,
};
