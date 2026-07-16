// import get from "mongoose";
// import request from "../models/request.js";
// import requestController from "../controllers/requestController.js";

// const newRequest = async (data) => {
//     const { title, description, category, priority, status, currentStep, createdBy, completionDate } = data;
//     if (!title || !description || !category || !priority || !status || !currentStep || !createdBy || !completionDate) {
//         const error = new Error("Todos os campos devem ser preenchidos corretamente");
//         error.statusCode = 400;
//         throw error;
//     }
//     const newRequestData = await request.create(data);
//     return newRequestData;
// };


// const getAllRequests = async () => {
//     const requests = await request.find();
//     return requests;
// };

// const getRequestsId = async (id)=>{
// const requestId = await request.findById(id);
// if(!requestId){
//     const error = new Error ("Solicitação não encontrada")
// }
// return requestId
// }
// export default {
//     newRequest,
//     getAllRequests,
//     getRequestsId
// }