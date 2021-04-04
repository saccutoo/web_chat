import IConfig from "../core/config-interface";

const config: IConfig = require('../../appConfig.json');
// Khai báo constants
export const WORK_TALK_CONST = {
    // Ngày thành lập công ty
    TIMESTART: new Date('2003-09-22T08:00').getTime()
}
// Cắt chuỗi từ orgid (ký tự thứ 12) - gồm 7 ký tự
const getOrgId = () => {
    // orgId sẽ lấy từ ihcm
    const orgId = '5YVlzu40007M000Gt5100100';
    return orgId.slice(12, 18);
}

const digits: string[] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
]

const randomCharacters = (length: number) => {
    let result = '';
    let digitsLength = digits.length;
    for (let i = 0; i < length; i++) {
        result += digits[Math.floor(Math.random() * digitsLength)];
    }
    return result;

}
const genTimestamp = (i: number, length: number) => {
    let buf: string[] = [];
    let charPos: number = length - 1;
    const MAX_RADIX = digits.length;
    while (i >= MAX_RADIX && charPos > 0) {
        buf[charPos--] = digits[Math.floor(i % MAX_RADIX)];
        i = i / MAX_RADIX;
    }
    buf[charPos] = digits[Math.floor(i % MAX_RADIX)];
    for (let j = 0; j < charPos; j++) {
        buf[j] = '0'
    }
    return buf.join('');
}
export const genGuidId = (objTable: string) => {
    const timestamps = genTimestamp(new Date().getTime() - WORK_TALK_CONST.TIMESTART, 7)
    return timestamps +
        randomCharacters(5) +
        getOrgId() +
        config.configId.objTable[objTable] +
        config.configId.nodeServer;
}


export const getOrgIdByUser = () => {
    // Hàm lấy orgId theo user
    return '5YVlzu40007M000Gt5100100';
}
