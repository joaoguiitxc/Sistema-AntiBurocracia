import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
            enum: ["Stock Replenishment","Purchasing", "Maintenance", "Cleaning", "Administrative", "other"]
        },

        priority: {
            type: String,
            required: true,
            trim: true,
            enum: ["low","average","high"],

        },

        status: {
            type: String,
            required: true,
            trim: true,
            enum: ["in progess","completed","cancelled" ]
        },

         currentStep: {
            type: String,
            required: true,
            trim: true,
        },

        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },

        completionDate: {
            type: Date,
            required: true,
            trim: true,
        },

        observations: {
            type: String,
            required: false,
            trim: true,
        },

    },
    {
        collection: "request",
        timestamps: true,
    }
);

export default mongoose.model("request", requestSchema);