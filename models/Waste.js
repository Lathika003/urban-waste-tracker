const mongoose = require('mongoose');
const wasteSchema = new mongoose.Schema({
    location: { type: String, required: true },
    wasteType: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    reportedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Waste', wasteSchema);