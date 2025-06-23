class GetUserResponseDto {
    constructor(user) {
        const { _id, firstName, lastName, phone, role, username } = user;
        Object.assign(this, { _id, firstName, lastName, phone, role, username });
    }
}

export default GetUserResponseDto;