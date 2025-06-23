class ResponseDto {
    constructor(response) {
        const { success, message = null, data = null, pagination = null } = response;
        Object.assign(this, { success, message, data, pagination });
    }
}

export default ResponseDto;