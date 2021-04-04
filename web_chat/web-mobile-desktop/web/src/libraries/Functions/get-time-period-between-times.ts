export function haveSameTimePeriod(startTime: Date, endTime: Date) {
    if (startTime && endTime) {
        const start = startTime.getTime();
        const end = endTime.getTime();
        const seconds = Math.abs(end - start) / 1000;
        if (seconds < 60) {
            return true;
        }
        return false;
    }
    return false;
}

/**
 * Tính thời gian giữa 2 params
 * @param  {Date} startTime
 * @param  {Date} endTime
 * @returns Giờ
 */

export const calBetweenTimes = (startTime: Date, endTime: Date) => {
    if (startTime && endTime) {
        const start = startTime.getTime();
        const end = endTime.getTime();
        return Math.abs(end - start) / 1000 / 60 / 60;
    }
    return 0;
}
/**
 * Trả về thời gian sáng chiều
 * @param  {Date} time
 */
export const getDayByTime = (time: Date) => {
    if (time.getHours() >= 12) return "PM"
    return "AM"
}
/**
 * Quyennq lấy thời gian trong tuần
 * @param  {Date} date truyển vào thời gian
 * @returns return về các ngày trong tuần
 */

export const getDayInWeek = (date: Date) => {
    const day = date.getDay();
    switch (day) {
        case 2: return "Thứ hai"
        case 3: return "Thứ ba"
        case 4: return "Thứ tư"
        case 5: return "Thứ năm"
        case 6: return "Thứ sáu"
        case 7: return "Thứ bảy"
        case 1: return "Chủ nhật"
        default: return ""
    }
}