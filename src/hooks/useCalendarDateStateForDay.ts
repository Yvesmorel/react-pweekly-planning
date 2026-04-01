import { useEffect, useMemo, useState } from "react";
import {
    calculateWeekDifference,
    getDateObjectInTimeZone,
    getDayHourly,
    getWeekDays,
    saveTasksToLocalStorage,
} from "../lib/utils";
import {
    dailyHoursType,
    TasksType,
    TimeZone,
    weekDaysType,
} from "../definitions";

function useCalendarDateStateForDay(
    date: Date,
    weekOffset: number | undefined,
    timeZone: TimeZone | undefined,
    dayOffset: number | undefined,
) {

    let calendarDateState = useMemo(() => {
        const currentWeekOffset = (weekOffset !== undefined) ? weekOffset : (timeZone
            ? calculateWeekDifference(getDateObjectInTimeZone(timeZone), timeZone)
            : calculateWeekDifference(date, timeZone));

        const weekDays = getWeekDays(currentWeekOffset, timeZone);
        const dailyHours = getDayHourly(currentWeekOffset, timeZone);
        const calData = {
            dailyHours: dailyHours,
            weekDays,
            weekOffset: currentWeekOffset,
        };


        return calData;
    }, [date, weekOffset, dayOffset, timeZone]);

    return { ...calendarDateState };
}

export default useCalendarDateStateForDay;
