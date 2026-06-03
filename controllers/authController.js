const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User Registered',
            user
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.json({
            token,
            user
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getUsers = async (req, res) => {

    try {

        const users = await User.find(
            {},
            {
                password: 0
            }
        );

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};