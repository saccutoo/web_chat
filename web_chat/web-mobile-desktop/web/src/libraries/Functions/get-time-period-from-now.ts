import moment from "moment";

export default function getTimePeriodFromNow(time:string){
    if(time){
        const lastTime = moment(time);
        const now = moment();
        const duration = moment.duration(now.diff(lastTime));
    
        const daysBetween2Dates = duration.asDays();
        if(daysBetween2Dates >= 1){
            if(lastTime.year() === now.year()){
                return lastTime.format("DD/MM");
            }
            return lastTime.format("DD/MM/YYYY");
        }
        const hour = Math.floor(duration.asHours());
        if(hour < 1){
            let minutes = Math.floor(duration.asMinutes());
            if(minutes <= 0){
                minutes = 1;
            }
            return minutes + " phút";
        }
        return hour +" giờ";
    }
    
    return "";
}

