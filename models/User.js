import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        match: /^[a-zA-Z]{1,}$/,
        required: true
    },
    lastName: {
        type: String,
        match: /^[a-zA-Z]{1,}$/,
        required: true
    },
    phone: {
        type: String,
        match: /^\d{10}$/
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true
    },
    username: {
        type: String,
        match: /^\w{6,30}$/,
        unique: true,
        required: true
    },
    password: {
        type: String,
        match: /^.{6,30}$/,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 10);

    next();
});

const User = mongoose.model('User', userSchema);

export default User;