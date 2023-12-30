import express from "express";
import homeController from "../controllers/homeController";
import ItemController from "../controllers/ItemController";
import UserController from "../controllers/UserController";
const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", homeController.getHomeController);
  router.get("/api/getAllItem", ItemController.handleGetAllItem);
  router.post("/api/signIn", UserController.handleSignIn);
  router.post(
    "/api/getAllReviewsByProduct",
    ItemController.handleGetAllReviewsByProduct
  );
  return app.use("/", router);
};
module.exports = initWebRoutes;
