import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  scannerId: { type: String, required: true },
  status: { type: String, enum: ['entered', 'exited'], required: true },
  timestamp: { type: Date, default: Date.now }
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;