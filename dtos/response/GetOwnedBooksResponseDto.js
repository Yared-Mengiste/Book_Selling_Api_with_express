class GetOwnedBookResponseDto {
    constructor(book) {
        const { _id, isbn, title, author, genre, description, price, coverImage } = book;
        Object.assign(this, { _id, isbn, title, author, genre, description, price, coverImage });
    }
}

export default GetOwnedBookResponseDto;