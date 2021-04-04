

export interface IBaseSequelize<T> {

    /**
     * Lấy dữ liệu theo khóa chính tự động chèn org id vào where
     * @param  {any} identifier  Khóa chính
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    findByPkByOrg(identifier: any, options?: any | undefined): Promise<any>;
    /** 
     * Thêm dữ liệu vào bảng tự động chèn orgId
     * @param  {T} values? Đối tượng 
     * @param  {any} options? Tùy chọn ( docmunent sequelize)
     */
    createByOrg(values?: any, options?: any): Promise<any>;
    /**
     * Lấy dữ liệu auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    findAllByOrg(options?: any | undefined): Promise<any>;
    /**
     * Cập nhật đói tượng auto chèn orgId
     * @param  {T} object Đối tượng
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    updateByOrg(object: any, options?: any | undefined): Promise<any>;
    /**
     * Đếm auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    countByOrg(options?: any | undefined): Promise<number>;
    /**
     * Lấy 1 bản ghi theo điều kiện
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    findOneByOrg(options?: any | undefined): Promise<any>;
    /**
     * Lấy dữ liệu và đếm auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    findAndCountAllByOrg(options?: any | undefined): Promise<any>;
    /**
     * Lấy max auto thêm orgId
     * @param  {any} field Tên trường 
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    maxByOrg(field: any, options?: any | undefined): Promise<any>;
    /**
     * Lấy min auto chèn orgId
     * @param  {any} field Tên trường 
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    minByOrg(field: any, options?: any | undefined): Promise<any>;
    /**
     * Lấy tổng auto chèn orgId
     * @param  {any} field Tên trường
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    sumByOrg(field: any, options?: any | undefined): Promise<number>;
    /** 
     * Xóa auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    destroyByOrg(options?: any | undefined): Promise<number>;

    findByPk(identifier: any, options?: any | undefined): Promise<any>;
    create(values?: any, options?: any): Promise<any>;
    findAll(options?: any | undefined): Promise<any>;
    update(object: any, options?: any | undefined): Promise<any>;
    count(options?: any | undefined): Promise<number>;
    findOne(options?: any | undefined): Promise<any>;
    findAndCountAll(options?: any | undefined): Promise<any>;
    max(field: any, options?: any | undefined): Promise<any>;
    min(field: any, options?: any | undefined): Promise<any>;
    sum(field: any, options?: any | undefined): Promise<number>;
    destroy(options?: any | undefined): Promise<number>;
}