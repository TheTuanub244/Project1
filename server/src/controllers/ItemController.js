const ItemService = require("../services/ItemService");

const handleGetAllItem = async (req, res) => {
  const page = req.body.page;
  const max = parseInt(req.body.max);
  const min = parseInt(req.body.min);
  const search = req.body.search;
  const star = req.body.star;
  const category = req.body.category;
  const respone = await ItemService.getAllItem({
    page,
    star,
    category,
    max,
    min,
    search,
  });
  return res.status(200).json({
    respone,
  });
};
const handleGetAllReviewsByProduct = async (req, res) => {
  const id = req.body.id;
  const page = req.body.page;
  const respone = await ItemService.getAllReviewsByProduct({ page, id });
  return res.status(200).json({
    respone,
  });
};
const handleAddTransaction = async (req, res) => {
  const transaction = req.body;
  const respone = await ItemService.addTransaction(transaction);
  return res.status(200).json({
    respone,
  });
};
const handleGetTransactionByUser = async (req, res) => {
  let respone;
  if (req.body != null) {
    const userID = req.body.userID;
    const stateID = req.body.stateID;
    respone = await ItemService.getTransactionByUser({ userID, stateID });
  } else {
    respone = await ItemService.getTransactionByUser();
  }
  return res.status(200).json({
    respone,
  });
};
const handleGetProductById = async (req, res) => {
  const id = req.body.id;
  const respone = await ItemService.getProductById(id);
  return res.status(200).json({
    respone,
  });
};
const handleGetAllTransaction = async (req, res) => {
  const option = req.body.option;
  const search = req.body.search;
  const respone = await ItemService.getAllTransaction({ option, search });
  return res.status(200).json({
    respone,
  });
};
const handleUpdateTransaction = async (req, res) => {
  const id = req.body.id;
  const state = req.body.state;
  const respone = await ItemService.updateTransaction(id, state);
  return res.status(200).json({
    respone,
  });
};

module.exports = {
  handleGetAllItem: handleGetAllItem,
  handleGetAllReviewsByProduct: handleGetAllReviewsByProduct,
  handleAddTransaction: handleAddTransaction,
  handleGetTransactionByUser: handleGetTransactionByUser,
  handleGetProductById: handleGetProductById,
  handleGetAllTransaction: handleGetAllTransaction,
  handleUpdateTransaction: handleUpdateTransaction,
};
