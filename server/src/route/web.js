import express from "express";
import homeController from "../controllers/homeController";
import ItemController from "../controllers/ItemController";
import UserController from "../controllers/UserController";
const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", homeController.getHomeController);
  router.post("/api/getAllItem", ItemController.handleGetAllItem);
  router.post("/api/signIn", UserController.handleSignIn);
  router.post(
    "/api/getAllReviewsByProduct",
    ItemController.handleGetAllReviewsByProduct
  );
  router.post("/api/addTransaction", ItemController.handleAddTransaction);
  router.post("/api/getTransaction", ItemController.handleGetTransactionByUser);
  router.post("/api/getProductById", ItemController.handleGetProductById);
  router.post("/api/getAllTransaction", ItemController.handleGetAllTransaction);
  router.post("/api/updateTransaction", ItemController.handleUpdateTransaction);
  router.post("/api/handleRegister", UserController.handleRegister);
  router.post("/api/addReview", UserController.addReview);
  router.post("/api/updateInfo", UserController.handleUpdateInfo);
  router.post("/api/changePass", UserController.handleChangPass);
  return app.use("/", router);
};
module.exports = initWebRoutes;
