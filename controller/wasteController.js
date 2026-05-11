import Waste from "../models/wasteModel.js";


export const create = async (req, res) => {
    try {
        const wasteData = new Waste(req.body);
        const savedWaste = await wasteData.save();
        res.status(201).json(savedWaste);
    } catch (error) {
        console.error("Error in create:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal Server Error." });
    }
}


export const fetch = async (req, res) => {
    try {
        const wastes = await Waste.find();
        if (wastes.length === 0) {
            return res.status(404).json({ message: "Records Not Found." });
        }
        res.status(200).json(wastes);
    } catch (error) {
        console.error("Error in fetch:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
}


export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const wasteExist = await Waste.findOne({ _id: id });
        if (!wasteExist) {
            return res.status(404).json({ message: "Record not found." });
        }
        const updateWaste = await Waste.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json(updateWaste);
    } catch (error) {
        console.error("Error in update:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid ID format." });
        }
        res.status(500).json({ error: "Internal Server Error." });
    }
}


export const deleteWaste = async (req, res) => {
    try {
        const id = req.params.id;
        const wasteExist = await Waste.findOne({ _id: id });
        if (!wasteExist) {
            return res.status(404).json({ message: "Record Not Found." });
        }
        await Waste.findByIdAndDelete(id);
        res.status(200).json({ message: "Record deleted Successfully." });
    } catch (error) {
        console.error("Error in deleteWaste:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid ID format." });
        }
        res.status(500).json({ error: "Internal Server Error." });
    }
}