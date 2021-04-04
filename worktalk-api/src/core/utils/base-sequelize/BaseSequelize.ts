import { getOrgIdByUser } from "../../../uuid/index";
import HyperConstants from "./constants";
import { IBaseSequelize } from "./IBaseSequelize";

interface Options {
    [key: string]: any
}

export default class BaseSequelize<T> implements IBaseSequelize<T> {
    model: any;
    constructor(model?: any) {
        this.model = model;
    }
    /**
     * Lấy dữ liệu theo khóa chính tự động chèn org id vào where
     * @param  {any} identifier  Khóa chính
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async findByPkByOrg(identifier: any, options?: any | undefined) {
        const newOptions = this.addOrgIdInOptions(options);

        return await this.model.findByPk(identifier, newOptions);
    }
    /** 
     * Thêm dữ liệu vào bảng tự động chèn orgId
     * @param  {any} values? Đối tượng 
     * @param  {any} options? Tùy chọn ( docmunent sequelize)
     */
    public async createByOrg(values?: any, options?: any) {
        const orgId = getOrgIdByUser();
        values[HyperConstants.orgIdField] = orgId;
        return await this.model.create(values, options);
    }
    /**
     * Lấy dữ liệu auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async findAllByOrg(options?: any | undefined) {
        const newOptions = this.addOrgIdInOptions(options);

        return await this.model.findAll(newOptions);
    }
    /**
     * Cập nhật đói tượng auto chèn orgId
     * @param  {T} object Đối tượng
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async updateByOrg(object: any, options?: any | undefined): Promise<any> {
        const newOptions = this.addOrgIdInOptions(options);

        await this.model.update(object, newOptions);
    }
    /**
     * Đếm auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async countByOrg(options?: any | undefined): Promise<number> {
        const newOptions = this.addOrgIdInOptions(options);

        return await this.model.count(newOptions);
    }
    /**
     * Lấy 1 bản ghi theo điều kiện
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async findOneByOrg(options?: any | undefined) {
        const newOptions = this.addOrgIdInOptions(options);
        return await this.model.findOne(newOptions);
    }
    /**
     * Lấy dữ liệu và đếm auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async findAndCountAllByOrg(options?: any | undefined) {
        const newOptions = this.addOrgIdInOptions(options);

        return await this.model.findAndCountAll(newOptions);
    }
    /**
     * Lấy max auto thêm orgId
     * @param  {any} field Tên trường 
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async maxByOrg(field: any, options?: any | undefined) {
        const newOptions = this.addOrgIdInOptions(options);

        return await this.model.max(field, newOptions);
    }
    /**
     * Lấy min auto chèn orgId
     * @param  {any} field Tên trường 
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async minByOrg(field: any, options?: any | undefined) {
        const newOptions = this.addOrgIdInOptions(options);
        return await this.model.min(field, newOptions);
    }
    /**
     * Lấy tổng auto chèn orgId
     * @param  {any} field Tên trường
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async sumByOrg(field: any, options?: any | undefined): Promise<number> {
        const newOptions = this.addOrgIdInOptions(options);
        return await this.model.sum(field, newOptions);
    }
    /** 
     * Xóa auto chèn orgId
     * @param  {any|undefined} options? Tùy chọn ( docmunent sequelize)
     */
    public async destroyByOrg(options?: any | undefined): Promise<number> {
        const newOptions = this.addOrgIdInOptions(options);
        return await this.model.destroy(newOptions);
    }



    // Hàm gốc của sequelize
    public async findByPk(identifier: any, options?: any | undefined) {
        return await this.model.findByPk(identifier, options);
    }

    public async create(values?: any, options?: any) {

        return await this.model.create(values, options);
    }
    public async findAll(options?: any | undefined) {

        return await this.model.findAll(options);
    }
    public async update(object: any, options?: any | undefined): Promise<any> {
        await this.model.update(object, options);
    }
    public async count(options?: any | undefined): Promise<number> {
        return await this.model.count(options);
    }
    public async findOne(options?: any | undefined) {
        return await this.model.findOne(options);
    }
    public async findAndCountAll(options?: any | undefined) {
        return await this.model.findAndCountAll(options);
    }
    public async max(field: any, options?: any | undefined) {
        return await this.model.max(field, options);
    }
    public async min(field: any, options?: any | undefined) {
        return await this.model.min(field, options);
    }
    public async sum(field: any, options?: any | undefined): Promise<number> {
        return await this.model.sum(field, options);
    }
    public async destroy(options?: any | undefined): Promise<number> {
        return await this.model.destroy(options);
    }
    addOrgIdInOptions(options?: Options | undefined | any) {
        const orgId = getOrgIdByUser();
        if (!options) {
            const newoptions: any = {
                where: {}
            };
            newoptions.where[HyperConstants.orgIdField] = orgId;
            return newoptions;
        }
        if (!options.where) {
            options.where = {};
        }
        options.where[HyperConstants.orgIdField] = orgId;
        return options;
    }
}