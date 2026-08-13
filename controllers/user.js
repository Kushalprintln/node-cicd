const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

const createUser = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;

        if (!name || !email || !password || !gender) {
            return res.status(400).json(
                {
                    message: "All fields are required"
                }
            )
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender
        })

        res.status(201).json({
            message: "User created successfully",
            user
        });


    } catch (err) {
        res.status(500).json({
            message: "error creating user",
            error: err.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Both email and password is required"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isPassCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPassCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = JWT.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        )

        return res.status(200).json({
            message: "Login successful",
            token,
            user
        });


    } catch (err) {
        res.status(500).json({
            message: "error logining In user",
            error: err.message
        })
    }

}

module.exports = { createUser, loginUser };