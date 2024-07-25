import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import studentRoutes from './routes/student.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import scannerRoutes from './routes/scanner.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // to parse incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/scanners', scannerRoutes);

// Serve static files from the frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start server and connect to MongoDB
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
