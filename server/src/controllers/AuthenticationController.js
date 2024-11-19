const Account = require('../models/Account');
const User = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
require('dotenv').config();
const crypto = require('crypto');

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};
class AuthenticationController {
    async login(req, res) {
        const { username, password } = req.body;
        try {
            const account = await Account.findOne({ where: { username } });
            if (!account) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const validPassword = await bcrypt.compare(password, account.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            await Account.update({ status: 1 }, { where: { idaccount: account.idaccount } });

            const token = jwt.sign({
                id: account.idaccount,
                role: account.role,
                status: account.status
            }, process.env.JWT_SECRET || 'gorth', { expiresIn: '1h' });

            return res.json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async logout(req, res) {
        try {
            await Account.update({ status: 0 }, { where: { idaccount: req.user.id } });
            return res.json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ message: 'Logout failed', error });
        }
    }

    async register(req, res) {
        const { username, password, email, firstname, lastname, phone, avatar } = req.body;
        // console.log(req.body)
        try {
            const token = generateToken();
            const existingAccount = await Account.findOne({
                where: { [Op.or]: [{ username }, { email }] }
            });
            if (existingAccount) {
                if (existingAccount.username === username) {
                    return res.status(400).json({ error: 'Username already exists' });
                }
                if (existingAccount.email === email) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAccount = await Account.create({
                username,
                password: hashedPassword,
                email,
                role: 0,
                status: 0,
                verificationtoken: token,
                isverify: false,
            });

            const newUser = await User.create({
                idaccount: newAccount.idaccount,
                firstname,
                lastname,
                phone_number: phone,
                avatar: null,
            });

            const newCart = await Cart.create({
                idaccount: newAccount.idaccount
            });

            await AuthenticationController.sendConfirmationEmail(email, token, req, res);

            return res.status(201).json({
                message: 'User registered successfully and confirmation email sent',
                account: newAccount,
                user: newUser,
                cart: newCart
            });

        } catch (error) {
            console.error('Registration error:', error);
            // return res.status(500).json({ error: 'Error registering user' });
        }
    }

    static async sendConfirmationEmail(email, token, req, res) {
        const verificationLink = `http://localhost:5172/authentication/verify-email?token=${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APSS,
            },
        });
        //process.env.EMAIL_USER
        const mailOptions = {
            from: "Gorth Inc.",
            to: email,
            subject: 'Welcome to Our Service!',
            text: 'Thank you for registering! We are excited to have you on board.',
            html: `<p>Nhấp vào link sau để xác minh tài khoản của bạn:</p><a href="${verificationLink}">Xác minh email</a>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            // console.log('Confirmation email sent successfully');
        } catch (error) {
            // console.error('Error sending confirmation email:', error);
            console.log(error)
            return res.status(500).json({ error: 'Error registering user' });
        }
    }

    async check(req, res) {
        try {
            const account = await Account.findByPk(req.user.id);
            if (!account) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ role: account.role });
        } catch (error) {
            console.error('Token validation error:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    }
    async verifyEmail(req, res) {
        const { token } = req.query;

        const user = await Account.findOne({ where: { verificationtoken: token } });

        if (user) {
            user.isverify = true;
            user.verificationtoken = null;
            await user.save();

            res.send('Email của bạn đã được xác minh thành công!');
        } else {
            res.send('Link xác minh không hợp lệ hoặc đã hết hạn.');
        }
    };
}

module.exports = new AuthenticationController();
