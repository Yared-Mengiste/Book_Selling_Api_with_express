class PaginationResponseDto {
    constructor({ currentPage, totalPages }) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }
}

export default PaginationResponseDto;