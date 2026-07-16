import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const router = express.Router();


router.get("/", authMiddleware, userController.getAllUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id",adminMiddleware, authMiddleware, userController.updateUser);
router.patch("/:id/desactivate",adminMiddleware, authMiddleware, userController.userDesativate);
router.patch("/:id/activate", adminMiddleware, authMiddleware, userController.userActivate);

export default router;