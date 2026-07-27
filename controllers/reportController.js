import reportService from "../services/reportService.js";

const averageTime = async (req, res, next) => {

    try {

        const report =
            await reportService.averageTime();

        res.status(200).json(report);

    } catch (error) {

        next(error);

    }

};

const bottlenecks = async (req, res, next) => {

    try {

        const report =
            await reportService.bottlenecks();

        res.status(200).json(report);

    } catch (error) {

        next(error);

    }

};

const workloadBySector = async (req, res, next) => {

    try {

        const report =
            await reportService.workloadBySector();

        res.status(200).json(report);

    } catch (error) {

        next(error);

    }

};

export default {
    averageTime,
    bottlenecks,
    workloadBySector
};