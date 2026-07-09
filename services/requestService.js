import get from "mongoose";
import request from "../models/request.js";
import requestController from "../controllers/requestController.js";

const newRequest = async (data, user) => {
    const { title,
        description,
        category,
        priority,
        status,
        currentStep,
        createdBy,
        completionDate
    } = data;
    if (!title || !description || !category || !priority || !status || !currentStep || !createdBy || !completionDate) {
        const error = new Error("Todos os campos devem ser preenchidos corretamente");
        error.statusCode = 400;
        throw error;
    }
    const newRequestData = await request.create(data);
    return newRequestData;
};

const getAllRequests = async () => {
    const requests = await request.find();
    return requests;
};

const getRequestId = async (userId) => {
    console.log(userId)
    const requests = await request.find({ createdBy: userId });
    return requests
}

const requestUpdate = async (id, data) => {
    const newRequest = await request.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
    return newRequest;
}

const requestForward = async (id, data) => {
const forward = await request.
}
export default {
    newRequest,
    getAllRequests,
    getRequestId,
    requestUpdate

}
// const forwardRequest = async (id, data) => {
//     const updated = await request.findByIdAndUpdate(id, data, {
//         new: true,
//         runValidators: true
//     })
//     return updated;
// }