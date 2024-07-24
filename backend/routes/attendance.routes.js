import express from 'express';
import { recordAttendance,
    getAttendance, getCurrentStatus } from '../controllers/attendance.controller.js';

const router = express.Router();

router.post('/record', recordAttendance);
router.get('/',getAttendance);
router.get('/status/:studentId', getCurrentStatus);

export default router;
