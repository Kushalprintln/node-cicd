const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
        {
        // Account information
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {  
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "other"],
        },

        // Profile information
        profile: {
            about: {
                type: String,
                default: "",
                trim: true,
            },

            dateOfBirth: {
                type: Date,
            },

            location: {
                city: {
                    type: String,
                    default: "",
                    trim: true,
                },

                country: {
                    type: String,
                    default: "",
                    trim: true,
                },
            },

            profilePhoto: {
                type: String,
                default: "",
            },

            coverPhoto: {
                type: String,
                default: "",
            },
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;