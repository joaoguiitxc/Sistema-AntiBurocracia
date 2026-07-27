import request from "../models/request.js";

const averageTime = async () => {

    const requests = await request.find({
        status: "completed"
    });

    let totalTime = 0;

    for (const req of requests) {

        const time =
            req.completionDate - req.createdAt;

        totalTime += time;
    }

    const average =
        requests.length > 0
            ? totalTime / requests.length
            : 0;

    const averageDays =
        average / (1000 * 60 * 60 * 24);

    return {
        averageTimeInDays:
            averageDays.toFixed(2)
    };
};

const bottlenecks = async () => {

    const requests = await request.find({
        status: "in progress"
    });

    const sectors = {};

    requests.forEach((req) => {

        if (!sectors[req.currentStep]) {

            sectors[req.currentStep] = 0;

        }

        sectors[req.currentStep]++;

    });

    return sectors;
};

const workloadBySector = async () => {

    const requests = await request.find({
        status: "in progress"
    });

    const workload = {};

    requests.forEach((req) => {

        if (!workload[req.currentStep]) {

            workload[req.currentStep] = 0;

        }

        workload[req.currentStep]++;

    });

    return workload;
};

export default {
    averageTime,
    bottlenecks,
    workloadBySector
};