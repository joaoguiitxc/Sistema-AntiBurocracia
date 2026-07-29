import mongoose from "mongoose";


const requestHistorySchema = new mongoose.Schema(
    {
        requestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
            required: true,
        },


        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        action: {
            type: String,
            required: true,
            trim: true,
        },


        previousStep: {
            type: String,
            trim: true,
            default: null,
        },


        newStep: {
            type: String,
            trim: true,
            default: null,
        },


        observations: {
            type: String,
            trim: true,
            default: null,
        },
    },
    {
        collection: "requestHistory",
        timestamps: true,
    }
);


export default mongoose.model(
    "RequestHistory",
    requestHistorySchema
);