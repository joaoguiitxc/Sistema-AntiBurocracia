import mongoose from "mongoose";

const requestHistoriesSchema = new mongoose.Schema(
    {
        requestId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        action: {
            type: String,
            required: false,
            trim: true,
        },
        previousStep: {
            type: String,
            required: false,
            trim: true,
        },
        newStep: {
            type: String,
            required: false,
            trim: true,
        },
        observations: {
            type: String,
            required: false,
            trim: true,
        },
    },
    {
        collection: "requestHistories",
        timestamps: true,
    }
);

export default mongoose.model("requestHistories", requestHistoriesSchema);