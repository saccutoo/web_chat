import moment from 'moment';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = MINUTE * 60;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

export const TIME_VALUE = {
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  MONTH,
  YEAR,
};

export class TimeHelper {
  static timeValue(): any {
    return TIME_VALUE;
  }

  static getToDay(): string {
    return moment().format('YYYY-MM-DD');
  }

  static getTimes(time: string | Date): number {
    return moment(time, 'YYYY-MM-DD h:mm:ss').valueOf();
  }

  static formatHours(time: any): string {
    return moment(time).format('LT');
  }

  static formatHHMM(time: any): string {
    return moment(time).format('HH:mm');
  }

  static formatYMD(time: any): string {
    return moment(time).format('YYYY-MM-DD');
  }

  static formatDMY(time: any, type?: string): string {
    return moment(time, type || undefined).format('DD/MM/YYYY');
  }

  static formatHMDMY(time: any): string {
    return moment(time).format('HH:mm DD/MM/YYYY');
  }

  static formatHMSDMY(time: any): string {
    return moment(time).format('HH:mm:ss DD/MM/YYYY');
  }

  static formatToDate(date: any): Date {
    date = moment(date, 'DD/MM/YYYY').valueOf();
    return moment(date).toDate();
  }
}
