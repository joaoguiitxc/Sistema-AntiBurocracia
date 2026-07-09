import requestService from "../services/requestService.js";


const newRequest = async (req, res, next) => {
    try {
        const request = await requestService.newRequest(req.body, req.user);
        res.status(201).json(request);
    } catch (error) {
        next(error);
    }
}

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
        const requests = await requestService.requestForward(req.params.id, req.body);
        res.status(200).json(requestForward);
    } catch (error) {
        next(error)
    }
}




export default {
    newRequest,
    getAllRequests,
    getRequestId,
    requestUpdate,
    requestForward

}
