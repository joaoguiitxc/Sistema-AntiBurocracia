// import requestService from "../services/requestService.js";


// const newRequest = async (req, res, next) => {
//     try {
//         const request = await requestService.newRequest(req.body);
//         res.status(201).json(request);
//     } catch (error) {
//         next(error);
//     }
// }

// const getAllRequests = async (req, res, next) => {
//     try {
//         const requests = await requestService.getAllRequests();
//         res.status(200).json(requests)

//     } catch (error) {
//         next(error);
//     }
// }

// const getRequestsId = async (req, res, next)=>{
// try{
//  const requestId = await requestService.getRequestsId(req.user._id);
//  res.status(200).json(requestId);
// }catch(error){
//     next(error)
// }
// }
// export default {
//     newRequest,
//     getAllRequests,
//     getRequestsId
// }