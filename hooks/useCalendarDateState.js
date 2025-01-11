import { useEffect, useState } from "react";
import { calculerEcartSemaine, getDayHourly, getWeekDays } from "../lib/utils";
function useCalendarDateState(date, weekOffset) {
    const [calendarDateState, setCalendarDateState] = useState({ dailyHours: [], weekDays: [] });
    useEffect(() => {
        const weekOffsetByDate = calculerEcartSemaine(date);
        const weekDays = getWeekDays(weekOffsetByDate || weekOffset || 0);
        const dailyHours = getDayHourly(weekOffsetByDate || weekOffset || 0);
        setCalendarDateState({ dailyHours: dailyHours, weekDays });
    }, [date, weekOffset]);
    return Object.assign({}, calendarDateState);
}
export default useCalendarDateState;
