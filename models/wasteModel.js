import mongoose from "mongoose";


const wasteSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    wasteType: {
        type: String,
        required: [true, "Waste type is required"],
        enum: {
            values: ["Plastic", "Organic", "E-Waste", "General"],
            message: "{VALUE} is not a valid waste type"
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Pending", "In Progress", "Resolved", "Collected"],
            message: "{VALUE} is not a valid status"
        },
        default: "Pending"
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });


export default mongoose.model("users", wasteSchema);