import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    userController.createUser
);
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    userController.getAllUser
);


router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    userController.getUserById
);


router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    userController.updateUser
);


router.patch(
    "/:id/deactivate",
    authMiddleware,
    adminMiddleware,
    userController.deactivateUser
);


router.patch(
    "/:id/activate",
    authMiddleware,
    adminMiddleware,
    userController.activateUser
);


export default router;