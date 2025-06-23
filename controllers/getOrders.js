import Order from "../models/Order.js";
import ResponseDto from "../dtos/response/ResponseDto.js";
import PaginationResponseDto from "../dtos/response/PaginationResponseDto.js";

// Controller to handle fetching all orders for the authenticated user with pagination
const getOrders = async (req, res, next) => {

    // Extract pagination parameters from validated query
    const { page, limit } = req.validQuery;
    const skip = (page - 1) * limit;

    try {
        // Fetch orders for the user, sorted by date, with pagination
        const orders = await Order
            .find({ user: req.user.id })
            .select('books status date')
            .sort('-date')
            .skip(skip)
            .limit(limit)
            .lean();

        // Count total orders for pagination info
        const totalOrders = await Order.countDocuments({ user: req.user.id });
        const totalPages = Math.ceil(totalOrders / limit);

        // Create a response DTO with orders and pagination info
        const responseDto = new ResponseDto({
            success: true,
            data: orders,
            pagination: new PaginationResponseDto({
                currentPage: page,
                totalPages
            })
        });

        // Send the response
        res.status(200).json(responseDto);
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default getOrders;