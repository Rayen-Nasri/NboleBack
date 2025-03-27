const baseEmailTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Lato', 'Helvetica', sans-serif;
            line-height: 1.6;
            color: #5D4037;
            background-color: #F5EDDD;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .container {
            max-width: 650px;
            margin: 0 auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(166, 138, 100, 0.12);
            border: 1px solid rgba(166, 138, 100, 0.15);
        }
        
        .header {
            text-align: center;
            padding: 30px 0 25px;
            border-bottom: 2px solid #F5EDDD;
            margin-bottom: 15px;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 2px;
            background-color: #A68A64;
        }
        
        .logo-container {
            margin-bottom: 18px;
            animation: fadeIn 0.8s ease-out;
        }
        
        .logo-text {
            font-size: 32px;
            font-weight: 700;
            color: #A68A64;
            letter-spacing: 1.5px;
            font-family: 'Playfair Display', serif;
            text-shadow: 0px 1px 1px rgba(0,0,0,0.05);
        }
        
        .content {
            padding: 35px 30px;
            color: #5D4037;
            font-size: 16px;
            line-height: 1.8;
            background-color: #FFFCF7;
            border-radius: 12px;
            margin: 15px 0;
            box-shadow: 0 2px 8px rgba(166, 138, 100, 0.05) inset;
        }
        
        .content h2 {
            color: #A68A64;
            margin-bottom: 24px;
            font-weight: 600;
            font-size: 26px;
            font-family: 'Playfair Display', serif;
            border-bottom: 1px solid rgba(166, 138, 100, 0.2);
            padding-bottom: 12px;
        }
        
        .content p {
            margin-bottom: 18px;
            color: #5D4037;
        }
        
        .button {
            display: inline-block;
            padding: 14px 32px;
            background-color: #A68A64;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            margin: 25px 0;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(166, 138, 100, 0.25);
            position: relative;
            overflow: hidden;
        }
        
        .button:hover {
            background-color: #8a7353;
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(166, 138, 100, 0.3);
        }
        
        .button:active {
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(166, 138, 100, 0.2);
        }
        
        .button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(-100%);
            transition: transform 0.6s ease-out;
        }
        
        .button:hover::after {
            transform: translateX(0);
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(to right, rgba(166, 138, 100, 0), rgba(166, 138, 100, 0.3), rgba(166, 138, 100, 0));
            margin: 25px 0;
        }
        
        .footer {
            text-align: center;
            padding: 25px 20px 15px;
            color: #8D6E63;
            font-size: 14px;
            border-top: 1px solid #F5EDDD;
            background-color: #FFFCF7;
            border-radius: 0 0 12px 12px;
        }
        
        .social-links {
            margin: 18px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }
        
        .social-links a {
            color: #A68A64;
            margin: 0 12px;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease, transform 0.3s ease;
            display: inline-block;
        }
        
        .social-links a:hover {
            color: #8a7353;
            transform: scale(1.05);
        }
        
        .logo-image {
            width: 90px;
            height: auto;
            margin: 0 auto 15px;
            display: block;
        }
        
        .highlight {
            background-color: #F5EDDD;
            padding: 20px 25px;
            border-radius: 10px;
            margin: 25px 0;
            border-left: 4px solid #A68A64;
            box-shadow: 0 2px 8px rgba(166, 138, 100, 0.08);
        }
        
        ul {
            padding-left: 25px;
        }
        
        ul li {
            margin-bottom: 12px;
            position: relative;
        }
        
        ul li::before {
            content: '•';
            color: #A68A64;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media only screen and (max-width: 600px) {
            .container {
                padding: 20px 15px;
                border-radius: 12px;
            }
            
            .content {
                padding: 25px 20px;
            }
            
            .logo-text {
                font-size: 28px;
            }
            
            .button {
                display: block;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-container">
                <div class="logo-text">Noble Nurture</div>
            </div>
            <svg width="55" height="45" viewBox="0 0 49 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto; display: block;">
                <path d="M24.15 39H18.165L8.155 23.845V39H2.17V14.43H8.155L18.165 29.655V14.43H24.15V39Z" fill="#A68A64"/>
                <path d="M22 15.85V21.835L37.155 31.845L22 31.845V37.83L46.57 37.83V31.845L31.345 21.835L46.57 21.835L46.57 15.85L22 15.85Z" fill="#A68A64"/>
            </svg>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Noble Nurture. All rights reserved.</p>
            <p style="margin-top: 8px;">This is an automated email, please do not reply.</p>
            <div class="social-links">
                <a href="#">Facebook</a> • <a href="#">Instagram</a> • <a href="#">Twitter</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const verificationEmailTemplate = (verificationToken) => {
    const content = `
        <h2>Email Verification</h2>
        <p>Thank you for registering with Noble Nurture. To complete your registration, please use the following verification code:</p>
        <div class="highlight" style="text-align: center; background: linear-gradient(to right, #F5EDDD, #F9F5ED, #F5EDDD);">
            <h3 style="font-size: 36px; letter-spacing: 8px; margin: 15px 0; color: #A68A64; font-family: 'Playfair Display', serif; font-weight: 600;">${verificationToken}</h3>
        </div>
        <p>This code will expire in 24 hours.</p>
        <p>If you did not request this verification, please ignore this email or <a href="#" style="color: #A68A64; text-decoration: underline; font-weight: 500;">contact our support team</a>.</p>
        <div class="divider"></div>
        <p style="font-size: 14px; color: #8D6E63; font-style: italic;">For security reasons, please never share this code with anyone.</p>
    `;
    return baseEmailTemplate(content);
};

export const welcomeEmailTemplate = (name) => {
    const content = `
        <h2>Welcome to Noble Nurture!</h2>
        <p>Dear ${name},</p>
        <p>We're thrilled to have you join our community. Your account has been successfully verified and you can now access all our features.</p>
        <div class="divider"></div>
        <p style="font-size: 18px; font-weight: 500; color: #A68A64; font-family: 'Playfair Display', serif;">Start exploring our platform and discover the amazing possibilities that await you!</p>
        
        <div style="background-color: #FFFAF0; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid rgba(166, 138, 100, 0.15);">
            <p style="font-weight: 600; margin-bottom: 15px; color: #5D4037;">Here's what you can do:</p>
            <ul>
                <li style="margin-bottom: 12px;">Browse our premium furniture collection</li>
                <li style="margin-bottom: 12px;">Explore design inspiration for your home</li>
                <li style="margin-bottom: 12px;">Connect with our community of design enthusiasts</li>
                <li style="margin-bottom: 12px;">Save your favorite items to your wishlist</li>
            </ul>
        </div>
        
        <a href="${process.env.FRONTEND_URL}" class="button">Get Started</a>
        
        <p style="font-size: 14px; color: #8D6E63; margin-top: 25px; font-style: italic;">We're excited to have you with us on this journey to create beautiful living spaces!</p>
    `;
    return baseEmailTemplate(content);
};

export const resetPasswordEmailTemplate = (resetLink) => {
    const content = `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" class="button" style="min-width: 200px;">Reset Password</a>
        </div>
        
        <div class="highlight" style="margin: 30px 0; background: linear-gradient(to right, #F5EDDD, #F9F5ED, #F5EDDD);">
            <p><strong style="color: #A68A64; font-size: 16px;">Important Security Notice:</strong></p>
            <p style="margin-top: 10px;">If you didn't request this change, please ignore this email or <a href="#" style="color: #A68A64; text-decoration: underline; font-weight: 500;">contact our support team</a> immediately.</p>
            <p style="margin-top: 10px;">This link will expire in <strong>1 hour</strong> for security purposes.</p>
        </div>
        
        <div style="background-color: #FFFAF0; border-radius: 10px; padding: 15px; margin: 20px 0; border: 1px solid rgba(166, 138, 100, 0.15);">
            <p style="font-size: 14px; color: #5D4037;"><span style="color: #A68A64;">⚠️</span> For security reasons, please ensure you're on the official Noble Nurture website before entering your new password.</p>
        </div>
        
        <p style="font-size: 14px; color: #8D6E63; margin-top: 20px; font-style: italic; text-align: center;">If you need any assistance, our support team is here to help.</p>
    `;
    return baseEmailTemplate(content);
};

export const passwordResetConfirmationTemplate = () => {
    const content = `
        <h2>Password Reset Successful</h2>
        
        <div style="text-align: center; margin: 25px 0;">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                <circle cx="12" cy="12" r="11" stroke="#A68A64" stroke-width="2"/>
                <path d="M7 12L10 15L17 8" stroke="#A68A64" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p style="margin-top: 15px; font-size: 18px; color: #A68A64; font-weight: 600;">Your password has been successfully reset</p>
        </div>
        
        <p>You can now log in to your account with your new password.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/login" class="button" style="min-width: 200px;">Login to Your Account</a>
        </div>
        
        <div class="divider"></div>
        
        <div style="background-color: #FFFAF0; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid rgba(166, 138, 100, 0.15);">
            <p style="font-size: 15px; font-weight: 600; color: #A68A64; margin-bottom: 12px;">Security Tips</p>
            <p style="font-size: 14px; margin-bottom: 10px;">For your account's security, we recommend:</p>
            <ul style="font-size: 14px;">
                <li style="margin-bottom: 10px;">Using unique passwords for different accounts</li>
                <li style="margin-bottom: 10px;">Changing your password periodically</li>
                <li style="margin-bottom: 10px;">Never sharing your login credentials with others</li>
                <li style="margin-bottom: 10px;">Enabling two-factor authentication when available</li>
            </ul>
        </div>
        
        <p style="font-size: 14px; color: #8D6E63; margin-top: 20px; font-style: italic; text-align: center;">Thank you for keeping your account secure!</p>
    `;
    return baseEmailTemplate(content);
};