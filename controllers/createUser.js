import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import ResponseDto from '../dtos/response/ResponseDto.js';
import CreateUserResponseDto from '../dtos/response/createUserResponseDto.js';
import AppError from '../utils/AppError.js';

// Controller to handle user registration
const createUser = async (req, res, next) => {
    try {
        // Check if the username already exists
        const usernameExists = await User.findOne({ username: req.validBody.username }) !== null;

        if (usernameExists)
            // If username exists, return a 400 error
            return next(new AppError('username already exists', 400));

        // Create a new user with the validated body
        const user = await User.create(req.validBody);

        if (user) {
            // Generate a JWT token for the new user
            const token = generateToken({ id: user._id, role: user.role });
            // Create a response DTO with user data and token
            const responseDto = new ResponseDto({
                success: true,
                data: new CreateUserResponseDto({ user, token })
            })

            // Send the response with status 200
            return res.status(200).json(responseDto);
        }

        // If user creation fails, return a bad request error
        next(new AppError('bad request', 400));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default createUser;