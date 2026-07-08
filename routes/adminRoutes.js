import express from "express"
import adminController from "../controllers/adminController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"
const router = express.Router()

router.get("/dashboard", authMiddleware, adminMiddleware, adminController.dashboard)
router.get("/reports/average-time", authMiddleware, adminMiddleware, adminController.averageTime)
router.get("/reports/bottlenecks", authMiddleware, adminMiddleware, adminController.bottlenecks)
router.get("/reports/workload-by-sector", authMiddleware, adminMiddleware, adminController.workloadBySector)

export default router