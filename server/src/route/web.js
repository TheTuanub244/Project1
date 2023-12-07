import express from "express";
import homeController from "../controllers/homeController";
import ItemController from "../controllers/ItemController";
const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", homeController.getHomeController);
  router.get("/api/getAllItem", ItemController.handleGetAllItem);
  return app.use("/", router);
};
module.exports = initWebRoutes;
