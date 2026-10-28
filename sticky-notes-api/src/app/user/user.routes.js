import express from "express";
import userController from "./user.controller.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);
export default router;