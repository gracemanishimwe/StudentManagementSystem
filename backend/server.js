import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/AttendanceRoutes.js';

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/attendance', attendanceRoutes);

app.get('/', (req, res) => {
  res.send(' Attendance System Backend is Running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB is connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});