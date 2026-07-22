import express from "express"
import adminController from "../controllers/adminController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"
const router = express.Router()

router.get("/dashboard", authMiddleware, adminMiddleware, adminController.dashboard)
router.get("/reports/averageTime", authMiddleware, adminMiddleware, adminController.averageTime)
router.get("/reports/bottLenecks", authMiddleware, adminMiddleware, adminController.bottlenecks)
router.get("/reports/workloadBySector", authMiddleware, adminMiddleware, adminController.workloadBySector)

export default router;