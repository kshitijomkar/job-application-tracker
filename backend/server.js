const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();        // Load environment variables

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());              // Allow cross-origin requests (from frontend)
app.use(express.json());      // Parse incoming JSON requests

// ✅ Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const jobRoutes = require('./routes/jobs');

app.use('/api/jobs', jobRoutes);


// ✅ Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
