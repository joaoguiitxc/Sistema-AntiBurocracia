import RequestHistory from "../models/requestHistory.js";
import Request from "../models/request.js";


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

    const request = await Request.findById(requestId);


    if (!request) {
        throw new Error(
            "Solicitação não encontrada."
        );
    }


    const isAdmin = user.role === "admin";


    const isCreator =
        request.createdBy &&
        request.createdBy.toString() === user._id.toString();


    const isCurrentSector =
        request.currentStep === user.sector;



    if (!isAdmin && !isCreator && !isCurrentSector) {
        throw new Error(
            "Você não possui permissão para visualizar este histórico."
        );
    }



    const history = await RequestHistory.find({
        requestId
    })
    .sort({
        createdAt: 1
    });



    return history;
};



export default {
    createHistory,
    getRequestHistory
};