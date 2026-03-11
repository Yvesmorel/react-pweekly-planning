import { useEffect, useState } from "react";
import { calculerEcartSemaine, getDateObjectInTimeZone, getDayHourly, getWeekDays, } from "../lib/utils";
function useCalendarDateState(date, weekOffset, timeZone) {
    const [calendarDateState, setCalendarDateState] = useState({ dailyHours: [], weekDays: [] });
    useEffect(() => {
        const weekOffsetByDate = timeZone
            ? calculerEcartSemaine(getDateObjectInTimeZone(timeZone), timeZone)
            : calculerEcartSemaine(date, timeZone);
        const weekDays = getWeekDays(weekOffsetByDate || weekOffset || 0, timeZone);
        const dailyHours = getDayHourly(weekOffsetByDate || weekOffset || 0, timeZone);
        const calData = {
            dailyHours: dailyHours,
            weekDays,
        };
        setCalendarDateState(calData);
    }, [date, weekOffset]);
    return Object.assign({}, calendarDateState);
}
export default useCalendarDateState;
