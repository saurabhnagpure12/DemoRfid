import Student from '../model/student.model.js';

export const addStudent = async (req, res) => {
  try {
    const { studentId, name } = req.body;
    const newStudent = new Student({ studentId, name });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add student', error });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get students', error });
  }
};
