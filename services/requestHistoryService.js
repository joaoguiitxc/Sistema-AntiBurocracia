import RequestHistory from "../models/requestHistory.js";
import request from "../models/request.js";

const createHistory = async (
    requestId,
    userId,
    action,
    previousStep = null,
    newStep = null,
    observations = null
) => {

    const history = await RequestHistory.create({
        requestId,
        userId,
        action,
        previousStep,
        newStep,
        observations
    });

    return history;
};

const getRequestHistory = async (requestId, user) => {

    const requestH = await request.findById(requestId);

    if (!requestH) {
        throw new Error("Solicitação não encontrada.");
    }

    const isAdmin = user.role === "admin";

    const isCreator =
        requestH.createdBy.toString() === user._id.toString();

    const isCurrentSector =
        requestH.currentStep === user.sector;

    if (!isAdmin && !isCreator && !isCurrentSector) {
        throw new Error(
            "Você não possui permissão para visualizar este histórico."
        );
    }

    const history = await RequestHistory.find({
        requestId
    }).sort({ createdAt: 1 });

    return history;
};

export default {
    createHistory,
    getRequestHistory
};
