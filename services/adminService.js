import Request from "../models/request.js";
import RequestHistory from "../models/requestHistory.js";


const dashboard = async () => {

    const totalRequests = await Request.countDocuments();

    const inProgress = await Request.countDocuments({
        status: "in progress"
    });

    const completed = await Request.countDocuments({
        status: "completed"
    });

    const cancelled = await Request.countDocuments({
        status: "cancelled"
    });


    return {
        totalRequests,
        inProgress,
        completed,
        cancelled
    };
};



const averageTime = async () => {

    const requests = await Request.find({
        status: "completed"
    });


    if (requests.length === 0) {
        const error = new Error(
            "Não existem solicitações concluídas"
        );

        error.statusCode = 404;

        throw error;
    }


    let totalTime = 0;


    requests.forEach(item => {

        totalTime +=
            item.completionDate - item.createdAt;

    });


    const averageMilliseconds =
        totalTime / requests.length;


    const averageDays =
        averageMilliseconds /
        (1000 * 60 * 60 * 24);



    return {
        averageDays: Number(averageDays.toFixed(2))
    };
};



const bottlenecks = async () => {

    const bottlenecks = await Request.aggregate([
        {
            $match: {
                status: "in progress"
            }
        },
        {
            $group: {
                _id: "$currentStep",
                totalRequests: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                totalRequests: -1
            }
        }
    ]);


    return bottlenecks;
};



const workloadBySector = async () => {

    const workload = await Request.aggregate([
        {
            $group: {
                _id: "$currentStep",
                totalRequests: {
                    $sum: 1
                }
            }
        }
    ]);


    return workload;
};



export default {
    dashboard,
    averageTime,
    bottlenecks,
    workloadBySector
};