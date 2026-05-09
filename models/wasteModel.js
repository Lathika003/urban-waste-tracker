import mongoose from "mongoose";


const wasteSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    wasteType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
});


export default mongoose.model("users", wasteSchema);