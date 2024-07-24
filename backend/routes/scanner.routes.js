import express from 'express';
import { addScanner, getScanners } from '../controllers/scanner.controller.js';

const router = express.Router();

router.post('/add', addScanner);
router.get('/', getScanners);

export default router;
