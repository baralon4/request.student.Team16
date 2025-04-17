const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/users');
const requestRoutes = require('./routes/requests');

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
