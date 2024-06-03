import express from 'express';
import { forgotPassword, getProfile, resetPassword, updateProfile } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;
