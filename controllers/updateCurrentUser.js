import User from "../models/User.js";
import ResponseDto from "../dtos/response/ResponseDto.js";
import AppError from "../utils/AppError.js";

// Controller to handle updating the currently authenticated user's information
const updateCurrentUser = async (req, res, next) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.user.id },
            { $set: { ...req.validBody } },
            { runValidators: true }
        );

        if (updatedUser.modifiedCount > 0) {
            const responseDto = new ResponseDto({ success: true });
            return res.status(200).json(responseDto);
        }

        next(new AppError('user not modified', 500));
    } catch (err) {
        next(err);
    }
}

export default updateCurrentUser;