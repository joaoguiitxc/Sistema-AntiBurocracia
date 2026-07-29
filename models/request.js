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
            enum: [
                "Stock Replenishment",
                "Purchasing",
                "Maintenance",
                "Cleaning",
                "Administrative",
                "Other"
            ],
        },


        priority: {
            type: String,
            required: true,
            enum: [
                "Low",
                "Average",
                "High"
            ],
        },


        status: {
            type: String,
            required: true,
            default: "in progress",
            enum: [
                "in progress",
                "completed",
                "cancelled"
            ],
        },


        currentStep: {
            type: String,
            required: true,
            default: "Administrative",
            enum: [
                "Administrative",
                "Purchasing",
                "Finance",
                "Maintenance",
                "Cleaning",
                "Completed"
            ],
        },


        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        completionDate: {
            type: Date,
            default: null,
        },


        observations: {
            type: String,
            trim: true,
            default: null,
        },
    },
    {
        collection: "request",
        timestamps: true,
    }
);


export default mongoose.model("Request", requestSchema);
