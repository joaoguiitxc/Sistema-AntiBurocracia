import express from "express";
import reportController from "../controllers/reportController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/average-time", authMiddleware, adminMiddleware, reportController.averageTime);

router.get("/bottlenecks", authMiddleware, adminMiddleware, reportController.bottlenecks);

router.get("/workload-by-sector", authMiddleware, adminMiddleware, reportController.workloadBySector);

export default router;