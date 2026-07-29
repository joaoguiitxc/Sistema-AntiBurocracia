import Request from "../models/request.js";


const averageTime = async () => {

    const requests = await Request.find({
        status: "completed"
    });


    let totalTime = 0;


    for (const item of requests) {

        totalTime +=
            item.completionDate - item.createdAt;

    }


    const average =
        requests.length > 0
            ? totalTime / requests.length
            : 0;



    const averageDays =
        average / (1000 * 60 * 60 * 24);



    return {
        averageTimeInDays:
            Number(averageDays.toFixed(2))
    };

};



const bottlenecks = async () => {

    const requests = await Request.find({
        status: "in progress"
    });


    const sectors = {};


    requests.forEach((item) => {

        if (!sectors[item.currentStep]) {

            sectors[item.currentStep] = 0;

        }


        sectors[item.currentStep]++;

    });



    return sectors;

};



const workloadBySector = async () => {

    const requests = await Request.find({
        status: "in progress"
    });


    const workload = {};


    requests.forEach((item) => {

        if (!workload[item.currentStep]) {

            workload[item.currentStep] = 0;

        }


        workload[item.currentStep]++;

    });



    return workload;

};



export default {
    averageTime,
    bottlenecks,
    workloadBySector
};