import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRoutes = Router();
userRoutes.post("/users", userController.add);
userRoutes.post("/users/address", authMiddleware, userController.addAddress);
userRoutes.get("/users", userController.get);
userRoutes.get("/users/:id", userController.find);
userRoutes.put("/users", authMiddleware, userController.update);
userRoutes.delete("/users/:id", userController.delete);

export { userRoutes };
