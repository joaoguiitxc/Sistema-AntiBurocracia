import Request from "../models/request.js";
import requestHistoryService from "./requestHistoryService.js";


const newRequest = async (body, userId) => {

    const newRequest = await Request.create({
        title: body.title,
        description: body.description,
        category: body.category,
        priority: body.priority,
        status: "in progress",
        currentStep: "Administrative",
        createdBy: userId,
    });


    await requestHistoryService.createHistory(
        newRequest._id,
        userId,
        "Created",
        null,
        "Administrative",
        "Solicitação criada."
    );


    return newRequest;
};


const getAllRequests = async () => {
    return await Request.find();
};


const getRequestId = async (userId) => {
    return await Request.find({
        createdBy: userId
    });
};


const requestUpdate = async (id, data) => {

    const request = await Request.findById(id);


    if (!request) {
        throw new Error("Solicitação não encontrada.");
    }


    if (
        request.status === "completed" ||
        request.status === "cancelled"
    ) {
        throw new Error(
            "Solicitações concluídas ou canceladas não podem ser editadas."
        );
    }


    Object.assign(request, data);

    await request.save();

    return request;
};



const requestForward = async (id, nextStep, userId) => {

    const request = await Request.findById(id);


    if (!request) {
        throw new Error("Solicitação não encontrada.");
    }


    if (request.status !== "in progress") {
        throw new Error(
            "A solicitação não pode ser encaminhada."
        );
    }


    if (!nextStep || typeof nextStep !== "string") {
        throw new Error(
            "Próxima etapa inválida."
        );
    }


    const validSteps = [
        "Administrative",
        "Purchasing",
        "Finance",
        "Maintenance",
        "Cleaning",
        "Completed",
        "Stock"
    ];


    if (!validSteps.includes(nextStep)) {
        throw new Error("Etapa inválida.");
    }


    const previousStep = request.currentStep;


    request.currentStep = nextStep;


    if (nextStep === "Completed") {
        request.status = "completed";
        request.completionDate = new Date();
    }


    await request.save();


    await requestHistoryService.createHistory(
        request._id,
        userId,
        "Forwarded",
        previousStep,
        nextStep,
        null
    );


    return request;
};



const requestAdjustment = async (id, observation) => {

    const request = await Request.findById(id);


    if (!request) {
        throw new Error("Solicitação não encontrada.");
    }


    if (request.status !== "in progress") {
        throw new Error(
            "Essa solicitação não pode receber ajustes."
        );
    }


    if (!observation) {
        throw new Error(
            "A observação do ajuste é obrigatória."
        );
    }


    request.observations = observation;


    await request.save();


    await requestHistoryService.createHistory(
        request._id,
        request.createdBy,
        "Adjustment Requested",
        request.currentStep,
        request.currentStep,
        observation
    );


    return request;
};



const requestComplete = async (id) => {

    const request = await Request.findById(id);


    if (!request) {
        throw new Error(
            "Solicitação não encontrada."
        );
    }


    if (request.status !== "in progress") {
        throw new Error(
            "Essa solicitação não pode ser concluída."
        );
    }


    const previousStep = request.currentStep;


    request.status = "completed";
    request.currentStep = "Completed";
    request.completionDate = new Date();


    await request.save();


    await requestHistoryService.createHistory(
        request._id,
        request.createdBy,
        "Completed",
        previousStep,
        "Completed",
        "Solicitação concluída."
    );


    return request;
};



const requestCancel = async (id, observation) => {

    const request = await Request.findById(id);


    if (!request) {
        throw new Error(
            "Solicitação não encontrada."
        );
    }


    if (request.status !== "in progress") {
        throw new Error(
            "Essa solicitação não pode ser cancelada."
        );
    }


    if (!observation) {
        throw new Error(
            "O motivo do cancelamento é obrigatório."
        );
    }


    request.status = "cancelled";
    request.observations = observation;


    await request.save();


    await requestHistoryService.createHistory(
        request._id,
        request.createdBy,
        "Cancelled",
        request.currentStep,
        request.currentStep,
        observation
    );


    return request;
};


export default {
    newRequest,
    getAllRequests,
    getRequestId,
    requestUpdate,
    requestForward,
    requestAdjustment,
    requestComplete,
    requestCancel
};