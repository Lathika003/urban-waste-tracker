const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const wasteRoutes = require('./routes/wasteRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/waste', wasteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Successfully'))
  .catch((err) => console.error('❌ Database Connection Error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));