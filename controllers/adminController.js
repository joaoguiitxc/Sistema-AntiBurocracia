import adminService from "../services/adminService.js";


const dashboard = async (req, res, next) => {
    try {

        const data = await adminService.dashboard();

        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};



const averageTime = async (req, res, next) => {
    try {

        const data = await adminService.averageTime();

        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};



const bottlenecks = async (req, res, next) => {
    try {

        const data = await adminService.bottlenecks();

        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};



const workloadBySector = async (req, res, next) => {
    try {

        const data = await adminService.workloadBySector();

        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};



export default {
    dashboard,
    averageTime,
    bottlenecks,
    workloadBySector
};