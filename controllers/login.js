import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import ResponseDto from '../dtos/response/ResponseDto.js'
import LoginResponseDto from '../dtos/response/loginResponseDto.js';
import AppError from '../utils/AppError.js';

// Controller to handle user login
const login = async (req, res, next) => {
    try {
        // Find the user by username
        const user = await User.findOne({ username: req.validBody.username }).lean();

        // If user not found, return a 404 error
        if (!user)
            return next(new AppError('user not found', 404));

        // Compare the provided password with the stored hashed password
        const isValidLogin = await bcrypt.compare(req.validBody.password, user.password);

        if (isValidLogin) {
            // If login is valid, generate a JWT token and send a success response
            const token = generateToken({ id: user._id, role: user.role });
            const responseDto = new ResponseDto({
                success: true,
                data: new LoginResponseDto({ user, token })
            })
            return res.status(200).json(responseDto);
        }

        // If login is invalid, return a 400 error
        next(new AppError('invalid login', 400));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default login;