import get from "mongoose";
import request from "../models/request.js";
import requestController from "../controllers/requestController.js";
import requestHistoryService from "./requestHistoryService.js";

const newRequest = async (body, userId) => {

    const newRequest = await request.create({
        title: body.title,
        description: body.description,
        category: body.category,
        priority: body.priority,
        status: "in progress",
        currentStep: "Administrative",
        createdBy: userId,
    });
    console.log("1 - Solicitação criada");
    await requestHistoryService.createHistory(
        newRequest._id,
        userId,
        "Created",
        null,
        "Administrative",
        "Solicitação criada."
    );
    console.log("2 - Histórico criado");
    return newRequest;
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



const requestForward = async (id, nextStep, userId) => {

    const requestDoc = await request.findById(id);

    if (!requestDoc) {
        throw new Error("Solicitação não encontrada.");
    }

    if (requestDoc.status !== "in progress") {
        throw new Error("A solicitação não pode ser encaminhada.");
    }
    nextStep = nextStep.trim();
    const validSteps = [
        "Administrative",
        "Purchasing",
        "Finance",
        "Maintenance",
        "Cleaning",
        "Completed"
    ];

    console.log("nextStep recebido:", nextStep);
    console.log("é válido?", validSteps.includes(nextStep));

    if (!validSteps.includes(nextStep)) {
        throw new Error("Etapa inválida.");
    }
    const previousStep = requestDoc.currentStep;
    requestDoc.currentStep = nextStep;

    if (nextStep === "Completed") {
        requestDoc.status = "completed";
        requestDoc.completionDate = new Date();
    }

    await requestDoc.save();
    await requestHistoryService.createHistory(
        requestDoc._id,
        userId,
        requestDoc.createdBy,
        "Forwarded",
        previousStep,
        nextStep,
        null
    );
    return requestDoc;
};
const requestAdjustment = async (id, observation) => {

    const requestAdj = await request.findById(id);

    if (!requestAdj) {
        throw new Error("Solicitação não encontrada.");
    }


    if (requestAdj.status !== "in progress") {
        throw new Error(
            "Essa solicitação não pode receber ajustes."
        );
    }


    if (!observation) {
        throw new Error(
            "A observação do ajuste é obrigatória."
        );
    }


    requestAdj.observations = observation;


    await requestAdj.save();
    await requestHistoryService.createHistory(
        requestAdj._id,
        requestAdj.createdBy,
        "Adjustment Requested",
        requestAdj.currentStep,
        requestAdj.currentStep,
        observation
    );

    return requestAdj;
};
const requestComplete = async (id) => {
    const requestComplete = await request.findById(id);
    if (!requestComplete) {
        throw new Error("solicitação não encontrada");
    }
    if (requestComplete.status !== "in progress") {
        throw new Error("Essa solicitação ainda está em progresso")
    };
    requestComplete.status = "completed";
    const previousStep = requestComplete.currentStep;
    requestComplete.currentStep = "Completed";
    requestComplete.completionDate = new Date();

    await requestComplete.save();
    await requestHistoryService.createHistory(
        requestComplete._id,
        requestComplete.createdBy,
        "Completed",
        previousStep,
        "Completed",
        "Solicitação concluída."
    );
    return requestComplete;
};

const requestCancel = async (id, observation) => {
    const requestC = await request.findById(id);
    if (!requestC) {
        throw new Error("Solicitação não encontrada")
    }
    if (requestC.status !== "in progress") {
        throw new Error("Essa solicitação não pode ser cancelada")
    }
    if (!observation) {
        throw new Error("O motivo do cancelamento da solicitação é obrigatório")
    }
    requestC.status = "cancelled";
    requestC.observations = observation;

    await requestC.save()
    await requestHistoryService.createHistory(
        requestC._id,
        requestC.createdBy,
        "Cancelled",
        requestC.currentStep,
        requestC.currentStep,
        observation
    );
    return requestC

}
export default {
    newRequest,
    getAllRequests,
    getRequestId,
    requestUpdate,
    requestForward,
    requestAdjustment,
    requestComplete,
    requestCancel


}
