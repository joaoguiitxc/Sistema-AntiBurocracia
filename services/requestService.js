import get from "mongoose";
import request from "../models/request.js";
import requestController from "../controllers/requestController.js";

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



const requestForward = async (id, nextStep) => {

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

    requestDoc.currentStep = nextStep;

    if (nextStep === "Completed") {
        requestDoc.status = "completed";
        requestDoc.completionDate = new Date();
    }

    await requestDoc.save();

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


    return requestAdj;
};
export default {
    newRequest,
    getAllRequests,
    getRequestId,
    requestUpdate,
    requestForward,
    requestAdjustment


}
