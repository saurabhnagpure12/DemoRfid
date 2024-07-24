import Attendance from '../model/attendence.model.js';

export const recordAttendance = async (req, res) => {
  try {
    const { studentId, scannerId } = req.body;

    // Fetch the latest attendance record for the student
    const latestRecord = await Attendance.findOne({ studentId }).sort({ timestamp: -1 });

    // Determine the new status based on the latest record
    let newStatus;
    if (latestRecord) {
      newStatus = latestRecord.status === 'entered' ? 'exited' : 'entered';
    } else {
      // If no record exists, the first status must be 'entered'
      newStatus = 'entered';
    }

    // Create and save the new attendance record
    const newRecord = new Attendance({ studentId, scannerId, status: newStatus });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Failed to record attendance', error });
  }
};
export const getAttendance = async (req, res) => {
  try {
    const students = await Attendance.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get students', error });
  }
};


export const getCurrentStatus = async (req, res) => {
  try {
    const { studentId } = req.params;
    const latestRecord = await Attendance.findOne({ studentId }).sort({ timestamp: -1 });
    if (!latestRecord || latestRecord.status === 'exited') {
      return res.status(200).json({ studentId, status: 'outside' });
    }
    res.status(200).json({ studentId, status: 'inside', scannerId: latestRecord.scannerId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get student status', error });
  }
};
