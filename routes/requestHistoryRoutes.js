import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import requestHistoryController from "../controllers/requestHistoryController.js";

const router = express.Router();

router.get("/:requestId", authMiddleware, requestHistoryController.getRequestHistory);

export default router;