import request from "../models/request.js";
import requestService from "../services/requestService.js";


const newRequest = async (req, res) => {
    try {

        const newRequest = await requestService.newRequest(
            req.body,
            req.user._id
        );

        return res.status(201).json({
            message: "Solicitação criada com sucesso.",
            newRequest
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};


const getAllRequests = async (req, res, next) => {
    try {
        const requests = await requestService.getAllRequests();
        res.status(200).json(requests)

    } catch (error) {
        next(error);
    }
}

const getRequestId = async (req, res, next) => {
    try {
        const requestId = await requestService.getRequestId(req.user._id);
        res.status(200).json(requestId)
    } catch (error) {
        next(error);
    }
}
const requestUpdate = async (req, res, next) => {
    try {
        const newRequest = await requestService.requestUpdate(req.params.id, req.body);
        res.status(200).json(newRequest);
    } catch (error) {
        next(error)
    }
}

const requestForward = async (req, res, next) => {
    try {
        const { nextStep } = req.body;

        const request = await requestService.requestForward(
            req.params.id,
            nextStep
        );

        res.status(200).json(request);

    } catch (error) {
        next(error);
    }
};

const requestAdjustment = async (req, res, next) => {
    try {
        const { observation } = req.body;

        const adjustment = await requestService.requestAdjustment(req.params.id, observation);

        res.status(200).json({
            mesagge: "Solicitação enviada para ajuste.",
            adjustment
        })
    } catch (error) {
        next(error)
    }
};

const requestComplete = async (req, res, next) => {
    try {
        const requestComplete = await requestService.requestComplete(req.params.id);

        res.status(200).json({
            mesagge: "Solicitação concluída com sucesso",
            requestComplete
        });
    } catch (error) {
        next(error)
    }
};
const requestCancel = async (req, res, next) => {
    try {
        const { observation } = req.body;
        const cancel = await requestService.requestCancel(req.params.id, observation);
        res.status(200).json({
            mesagge: "Solicitação cancelada",
            cancel
        })
    } catch (error) {
        next(error)
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

}