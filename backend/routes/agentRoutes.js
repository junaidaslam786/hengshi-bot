import express from 'express';
import { createResponse } from '../controllers/agentController.js';
const router = express.Router();

// Route to create a new response
router.post('/generate-response', createResponse);

export default router