class CreateUserResponseDto {
    constructor(data) {
        const { user: { firstName, lastName, phone, role }, token } = data;
        this.user = { firstName, lastName, phone, role };
        this.token = token;
    }
}

export default CreateUserResponseDto;