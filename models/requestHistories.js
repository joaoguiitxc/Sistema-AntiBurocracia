// import { ObjectId } from "mongodb";
// import mongoose from "mongoose";

// const requestHistoriesSchema = new mongoose.Schema(
//     {
//         requestId: {
//             type: ObjectId,
//             required: true,
//             trim: true,
//         },

//         userId : {
//             type: ObjectId,
//             required: true,
//             trim: true,
//         },

//         action: {
//             type: String,
//             required: false,
//             trim: true,
//         },

//         previousStep: {
//             type: String,
//             required: false,
//             trim: true,
//         },

//         newStep: {
//             type: String,
//             required: false,
//             trim: true,
//         },

//          currentStep: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         observations: {
//             type: String,
//             required: false,
//             trim: true,
//         },

//         crateadAt: {
//             type: Date,
//             required: true,
//             trim: true,
//         },

//     },
//     {
//         collection: "requestHistories",
//         timestamps: true,
//     }
// );

// export default mongoose.model("requestHistories", requestHistoriesSchema);