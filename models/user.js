import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

            cpf: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            }
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
     
        role: {
            type: String,
            enum: ["EE", "admin"]
        },
        sector: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        }
    
    },
    {
        collection: "user",
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);