type PaginatedResponse<T> = {
    data: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
};

export { PaginatedResponse };
