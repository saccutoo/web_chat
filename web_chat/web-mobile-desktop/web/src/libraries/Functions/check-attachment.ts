import { ENUM_KIND_OF_ATTACHMENT } from "../Enum/attachment";
/**
 * quyennq Check file gửi lên là ảnh hay video hay file 
 * @param  {string} filename truyền vào tên file lấy đc khi ng dùng đẩy file
 * @returns return về type cua file
 */
const checkAttachment = (filename: string) => {
    let parts = filename.split('.');
    const getExtension = parts[parts.length - 1].toLowerCase();
    const extensionImage = ['jpg', 'gif', 'bmp', 'png' , 'jpeg' , 'psd' ];
    const extensionVideo = ['m4v', 'avi', 'mpg', 'mp4', 'webm'];
    const extensionExcel = ['xlsx', 'csv' , 'xls'];
    const extensionPdf = ['pdf'];
    const extensionDoc = ['doc' , 'docx' , 'dot' , 'dotx'];
    const extensionPowerPoint = ['pptx'];

    if (extensionImage.indexOf(getExtension) > -1) {
        return ENUM_KIND_OF_ATTACHMENT.IMAGE
    }
    if (extensionVideo.indexOf(getExtension) > -1) {
        return ENUM_KIND_OF_ATTACHMENT.VIDEO
    }
    if (extensionExcel.indexOf(getExtension) > -1) {
        return ENUM_KIND_OF_ATTACHMENT.EXCEL
    }
    if (extensionPdf.indexOf(getExtension) > -1) {
        return ENUM_KIND_OF_ATTACHMENT.PDF
    }
    if (extensionDoc.indexOf(getExtension) > -1) {
        return ENUM_KIND_OF_ATTACHMENT.DOC
    }
    if (extensionPowerPoint.indexOf(getExtension) > -1) {
        return ENUM_KIND_OF_ATTACHMENT.POWERPOINT
    }

    return ENUM_KIND_OF_ATTACHMENT.OTHER
}

/** 
 * quyennq
 * @param  {string} typeAttachment loại file
 * @returns return về tên loại file
 */
export const returnAttachment = (typeAttachment: string) => {
    switch (typeAttachment) {
        case ENUM_KIND_OF_ATTACHMENT.IMAGE: return 'ảnh';
        case ENUM_KIND_OF_ATTACHMENT.VIDEO: return 'video';
        case ENUM_KIND_OF_ATTACHMENT.EXCEL: return 'excel';
        case ENUM_KIND_OF_ATTACHMENT.PDF: return 'pdf';
        case ENUM_KIND_OF_ATTACHMENT.DOC: return 'doc';
        case ENUM_KIND_OF_ATTACHMENT.POWERPOINT: return 'powerpoint';
        default: return "file"
    }
}
export default checkAttachment;