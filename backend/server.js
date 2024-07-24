import express from 'express';
import bodyParser from 'body-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import attendanceRoutes from './routes/attendance.routes.js';
import studentRoutes from './routes/student.routes.js';
import scannerRoutes from './routes/scanner.routes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/scanners', scannerRoutes);

connectToMongoDB(); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
