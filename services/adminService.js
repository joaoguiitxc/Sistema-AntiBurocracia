import request from "../models/request.js";
// import requestHistory from "../models/requestHistory.js";

const dashboard = async () => {

    const totalRequests = await request.countDocuments();
    const inProgress = await request.countDocuments({ status: "in progress" });
    const completed = await request.countDocuments({ status: "completed" });
    const cancelled = await request.countDocuments({ status: "cancelled" });

    return {
        totalRequests,
        inProgress,
        completed,
        cancelled
    }
}

const averageTime = async () => {

    const requests = await request.find({
        status: "completed"
    })

    if (requests.length === 0) {
        const error = new Error("Não existem solicitações concluídas");
        error.statusCode = 404;
        throw error;
    }

    let totalTime = 0;

    requests.forEach(request => {
        totalTime += request.completionDate - request.createdAt;
    });

    const averageTime = totalTime / requests.length;

    return {
        averageTime
    }
}

const bottlenecks = async () => {

    const history = await RequestHistory.find()

    if (history.length === 0) {
        const error = new Error("Nenhum histórico encontrado");
        error.statusCode = 404;
        throw error;
    }

    return history;
}

const workloadBySector = async () => {

    const workload = await request.aggregate([
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
}

export default {
    dashboard,
    averageTime,
    bottlenecks,
    workloadBySector
}