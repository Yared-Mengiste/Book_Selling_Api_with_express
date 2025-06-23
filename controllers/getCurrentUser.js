import User from '../models/User.js';
import ResponseDto from '../dtos/response/ResponseDto.js';
import GetUserResponseDto from '../dtos/response/GetUserResponseDto.js';
import AppError from '../utils/AppError.js';

// Controller to handle fetching the currently authenticated user's info
const getCurrentUser = async (req, res, next) => {
    try {
        // Find the user by their ID and select specific fields
        const user = await User
            .findById(req.user.id)
            .select('-_id firstName lastName phone')
            .lean();

        // If user not found, return a 404 error
        if (!user)
            return next(new AppError('user not found', 404));

        // Create a response DTO with user data
        const responseDto = new ResponseDto({
            success: true,
            data: new GetUserResponseDto(user)
        });

        // Send the response
        res.status(200).json(responseDto);
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default getCurrentUser;