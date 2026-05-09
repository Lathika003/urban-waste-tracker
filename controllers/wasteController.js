const Waste = require('../models/Waste');

// Get all waste entries
exports.getAllWaste = async (req, res) => {
    try {
        // const waste = await Waste.find();
        res.status(200).json({ message: 'Get all waste data' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new waste entry
exports.createWaste = async (req, res) => {
    try {
        // const newWaste = new Waste(req.body);
        // await newWaste.save();
        res.status(201).json({ message: 'Create waste data' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
