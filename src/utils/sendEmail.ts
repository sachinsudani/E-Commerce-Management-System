import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    
    auth: {
      user: '',
      pass: '',
    }
  });

export const sendResetEmail = async (email: string, token: string) => {
    const resetURL = `http://yourdomain.com/reset-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the following link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);
};
