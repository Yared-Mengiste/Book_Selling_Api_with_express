import ResponseDto from "../dtos/response/ResponseDto.js";

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    // Set status code (default to 500 if not provided)
    const status = err.status || 500;
    // Set error message (default to generic message if not provided)
    const message = err.message || 'Internal Server Error';

    // Log the error stack trace for debugging
    console.error(err.stack);

    // Create a response DTO with error details
    const responseDto = new ResponseDto({ success: false, message })
    // Send the error response to the client
    res.status(status).json(responseDto);
};

export default errorHandler;