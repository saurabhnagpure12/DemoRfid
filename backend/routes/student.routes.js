import express from 'express';
import { addStudent, getStudents } from '../controllers/student.controller.js';

const router = express.Router();

router.post('/add', addStudent);
router.get('/', getStudents);

export default router;
