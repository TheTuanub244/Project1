import UserService from "../services/UserService";
const handleSignIn = async (req, res) => {
  const receivedToken = req.body.token;
  const respone = await UserService.checkSignIn(receivedToken);
  return res.status(200).json({
    respone,
  });
};
const handleRegister = async (req, res) => {
  const { lastName, firstName, email, password, repeatPassword } =
    req.body.userInfo;
  const respone = await UserService.register({
    lastName,
    firstName,
    email,
    password,
    repeatPassword,
  });
  return res.status(200).json({
    respone,
  });
};
const addReview = async (req, res) => {
  const userId = req.body.userId;
  const review = req.body.review;
  const rate = req.body.rate;
  const itemId = req.body.itemId;
  const respone = await UserService.addReview(userId, review, rate, itemId);
  return res.status(200).json({
    respone,
  });
};
const handleUpdateInfo = async (req, res) => {
  const userId = req.body.userId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const respone = await UserService.updateInfo(
    userId,
    firstName,
    lastName,
    email
  );
  return res.status(200).json({
    respone,
  });
};
const handleChangPass = async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  const respone = await UserService.changePass(userId, password);
  return res.status(200).json({
    respone,
  });
};
module.exports = {
  handleSignIn: handleSignIn,
  handleRegister: handleRegister,
  addReview: addReview,
  handleUpdateInfo: handleUpdateInfo,
  handleChangPass: handleChangPass,
};
