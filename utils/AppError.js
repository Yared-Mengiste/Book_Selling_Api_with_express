class AppError extends Error {
    constructor(message = 'Server internal error', status = '500') {
        super(message);
        this.status = status;
    }
}

export default AppError;
