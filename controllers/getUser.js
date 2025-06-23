import User from '../models/User.js';
import ResponseDto from '../dtos/response/ResponseDto.js';
import GetUserResponseDto from '../dtos/response/GetUserResponseDto.js';
import AppError from '../utils/AppError.js';

// Controller to handle fetching a user by ID
const getUser = async (req, res, next) => {
    try {
        // Find the user by ID and select specific fields
        const user = await User
            .findById(req.validParams.id)
            .select('firstName lastName phone role username')
            .lean();

        if (user) {
            // If user is found, send a success response with user data
            const responseDto = new ResponseDto({
                success: true,
                data: new GetUserResponseDto(user)
            });
            res.status(200).json(responseDto);
        }

        // If user is not found, return a 404 error
        next(new AppError('user not found', 404));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default getUser;