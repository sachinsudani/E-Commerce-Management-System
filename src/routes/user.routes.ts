import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/user.controller';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
