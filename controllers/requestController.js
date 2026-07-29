import requestService from "../services/requestService.js";


const newRequest = async (req, res, next) => {
    try {

        const newRequest = await requestService.newRequest(
            req.body,
            req.user._id
        );


        return res.status(201).json({
            message: "Solicitação criada com sucesso.",
            data: newRequest
        });

    } catch (error) {
        next(error);
    }
};



const getAllRequests = async (req, res, next) => {
    try {

        const requests = await requestService.getAllRequests();

        return res.status(200).json(requests);

    } catch (error) {
        next(error);
    }
};



const getRequestId = async (req, res, next) => {
    try {

        const requests = await requestService.getRequestId(
            req.user._id
        );

        return res.status(200).json(requests);

    } catch (error) {
        next(error);
    }
};



const requestUpdate = async (req, res, next) => {
    try {

        const request = await requestService.requestUpdate(
            req.params.id,
            req.body
        );


        return res.status(200).json(request);

    } catch (error) {
        next(error);
    }
};



const requestForward = async (req, res, next) => {
    try {

        const { nextStep } = req.body;


        const request = await requestService.requestForward(
            req.params.id,
            nextStep,
            req.user._id
        );


        return res.status(200).json(request);

    } catch (error) {
        next(error);
    }
};



const requestAdjustment = async (req, res, next) => {
    try {

        const { observation } = req.body;


        const adjustment = await requestService.requestAdjustment(
            req.params.id,
            observation
        );


        return res.status(200).json({
            message: "Solicitação enviada para ajuste.",
            data: adjustment
        });


    } catch (error) {
        next(error);
    }
};



const requestComplete = async (req, res, next) => {
    try {

        const requestComplete = await requestService.requestComplete(
            req.params.id
        );


        return res.status(200).json({
            message: "Solicitação concluída com sucesso.",
            data: requestComplete
        });


    } catch (error) {
        next(error);
    }
};



const requestCancel = async (req, res, next) => {
    try {

        const { observation } = req.body;


        const cancel = await requestService.requestCancel(
            req.params.id,
            observation
        );


        return res.status(200).json({
            message: "Solicitação cancelada.",
            data: cancel
        });


    } catch (error) {
        next(error);
    }
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