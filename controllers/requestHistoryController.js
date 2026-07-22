import requestHistoryService from "../services/requestHistoryService.js";

const getRequestHistory = async (req, res, next) => {

    try {

        const history =
            await requestHistoryService.getRequestHistory(
                req.params.requestId,
                req.user
            );

        res.status(200).json(history);

    } catch (error) {
        next(error);
    }

};

export default {
    getRequestHistory
};
