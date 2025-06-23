class GetBookResponseDto {
    constructor(book) {
        const {
            _id, isbn, title, author, genre, description, price, coverImage,
            owner: { firstName, lastName, phone }
        } = book;

        Object.assign(this, {
            _id, isbn, title, author, genre, description, price, coverImage,
            owner: { firstName, lastName, phone }
        });
    }
}

export default GetBookResponseDto;