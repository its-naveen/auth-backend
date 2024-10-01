import express from 'express';
import { authorization } from '../controllers/authController.js';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();
router.get('/get-users', authorization, getUsers);

export default router;
