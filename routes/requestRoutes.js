import express from "express";
import requestController from "../controllers/requestController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", requestController.newRequest);
router.get("/", requestController.getAllRequests);
router.get("/id", authMiddleware, requestController.getRequestId);
router.put("/:id", authMiddleware,requestController.requestUpdate);
router.patch("/:id/forward", authMiddleware, requestController.requestForward);

export default router;