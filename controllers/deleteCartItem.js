import Cart from '../models/Cart.js';
import ResponseDto from '../dtos/response/ResponseDto.js'
import AppError from '../utils/AppError.js';

// Controller to handle deleting an item from the user's cart
const deleteCartItem = async (req, res, next) => {
    try {
        // Remove the specified book from the user's cart
        const result = await Cart.updateOne(
            { user: req.user.id },
            { $pull: { books: req.validParams.bookId } },
            { runValidators: true }
        );

        // If a cart item was removed, send a success response
        if (result.modifiedCount) {
            const responseDto = new ResponseDto({ success: true });
            return res.status(200).json(responseDto);
        }

        // If no item was removed, return a 404 error
        next(new AppError('cart item not found', 404));
    } catch (err) {
        // Pass any errors to the error handler
        next(err);
    }
}

export default deleteCartItem;