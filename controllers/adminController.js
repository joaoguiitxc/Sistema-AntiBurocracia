import adminService from "../services/adminService.js"

const dashboard = async (req, res, next) => {
    try {
        const dashboard = await adminService.dashboard()
        res.status(200).json(dashboard)
    } catch (error) {
        next(error)
    }
}

const averageTime = async (req, res, next) => {
    try {
        const averageTime = await adminService.averageTime()
        res.status(200).json(averageTime)
    } catch (error) {
        next(error)
    }
}

const bottlenecks = async (req, res, next) => {
    try {
        const bottlenecks = await adminService.bottlenecks()
        res.status(200).json(bottlenecks)
    } catch (error) {
        next(error)
    }
}

const workloadBySector = async (req, res, next) => {
    try {
        const workload = await adminService.workloadBySector()
        res.status(200).json(workload)
    } catch (error) {
        next(error)
    }
}

export default {
    dashboard,
    averageTime,
    bottlenecks,
    workloadBySector
}