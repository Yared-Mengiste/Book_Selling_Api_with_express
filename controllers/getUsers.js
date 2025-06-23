import User from "../models/User.js";
import ResponseDto from "../dtos/response/ResponseDto.js";
import GetUserResponseDto from "../dtos/response/GetUserResponseDto.js";

// Controller to handle fetching all users
const getUsers = async (req, res) => {
    // Find all users and select specific fields
    const users = await User
        .find({})
        .select('firstName lastName phone role username')
        .lean();

    // Create a response DTO with user data
    const responseDto = new ResponseDto({
        success: true,
        data: users.map(user => new GetUserResponseDto(user))
    });

    // Send the response
    res.status(200).json(responseDto);
}

export default getUsers;