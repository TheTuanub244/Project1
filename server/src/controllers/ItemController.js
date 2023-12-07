const ItemService = require("../services/ItemService");

const handleGetAllItem = async (req, res) => {
  const id = req.body.id;
  const respone = await ItemService.getAllItem(id);
  return res.status(200).json({
    respone,
  });
};
module.exports = {
  handleGetAllItem: handleGetAllItem,
};
