import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
    verificationEmailTemplate,
    welcomeEmailTemplate,
    resetPasswordEmailTemplate,
    passwordResetConfirmationTemplate
} from './templates/emailTemplate.js';

dotenv.config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * Send an email using the configured transporter
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 * @returns {Promise} - Resolves with info about the sent email or rejects with error
 */
const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = {
            from: `"Noble Nurture" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

/**
 * Send verification email with token
 * @param {string} email - Recipient email address
 * @param {string} verificationToken - Verification token
 * @returns {Promise}
 */
export const sendVerificationEmail = async (email, verificationToken) => {
    return sendEmail({
        to: email,
        subject: 'Verify Your Email - Noble Nurture',
        html: verificationEmailTemplate(verificationToken)
    });
};

/**
 * Send welcome email after successful verification
 * @param {string} email - Recipient email address
 * @param {string} name - User's name
 * @returns {Promise}
 */
export const sendWelcomeEmail = async (email, name) => {
    return sendEmail({
        to: email,
        subject: 'Welcome to Noble Nurture!',
        html: welcomeEmailTemplate(name)
    });
};

/**
 * Send password reset email with reset link
 * @param {string} email - Recipient email address
 * @param {string} resetLink - Password reset link
 * @returns {Promise}
 */
export const sendResetPassword = async (email, resetLink) => {
    return sendEmail({
        to: email,
        subject: 'Reset Your Password - Noble Nurture',
        html: resetPasswordEmailTemplate(resetLink)
    });
};

/**
 * Send password reset confirmation email
 * @param {string} email - Recipient email address
 * @returns {Promise}
 */
export const sendResetPaswordEmail = async (email) => {
    return sendEmail({
        to: email,
        subject: 'Password Reset Successful - Noble Nurture',
        html: passwordResetConfirmationTemplate()
    });
};