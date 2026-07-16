import express from "express";
import requestController from "../controllers/requestController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, requestController.newRequest);
router.get("/", requestController.getAllRequests);
router.get("/id", authMiddleware, requestController.getRequestId);
router.put("/:id", authMiddleware,requestController.requestUpdate);
router.patch("/:id/forward", authMiddleware, requestController.requestForward);
router.patch("/:id/request-adjustement",authMiddleware, requestController.requestAdjustment);
export default router;