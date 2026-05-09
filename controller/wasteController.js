import Waste from "../models/wasteModel.js";


export const create = async (req, res) => {
    try {
        const wasteData = new Waste(req.body);
        const savedWaste = await wasteData.save();
        res.status(200).json(savedWaste);
    } catch (error) {
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
        const updateWaste = await Waste.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateWaste);
    } catch (error) {
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
        res.status(201).json({ message: "Record deleted Successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}