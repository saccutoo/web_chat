export class HyperPaginated {
    public static PAGE_SIZE_DEFAULT: number = 30;
    PAGE_SIZE_DEFAULT: number = 30;
    page: number;
    pageSize: number;
    offset: number;
    maxRow?: number;
    sortField?: string;
    ascent?: boolean;
    startRow?: number = 0;
    startRowDefault?: number = 0;

    constructor(page?: string, pageSize?: string, startRow?: number, maxRow?: number) {
        this.page = page ? parseInt(page) : 1;
        this.pageSize = pageSize ? parseInt(pageSize) : this.PAGE_SIZE_DEFAULT;
        this.startRow = startRow;
        this.maxRow = maxRow;
        this.offset = this.pageSize * (this.page - 1);
    }
}
