class GetCartItemsResponseDto {
    constructor(book) {
        const { _id, isbn, title, author, genre, price, coverImage } = book;
        Object.assign(this, { _id, isbn, title, author, genre, price, coverImage });
    }
}

export default GetCartItemsResponseDto;