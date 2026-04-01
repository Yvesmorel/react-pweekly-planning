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

function useCalendarDateState(
  date: Date,
  weekOffset: number | undefined,
  timeZone: TimeZone | undefined,
) {

  let calendarDateState = useMemo(() => {
    const weekOffsetByDate = timeZone
      ? calculateWeekDifference(getDateObjectInTimeZone(timeZone), timeZone)
      : calculateWeekDifference(date, timeZone);

    const weekDays = getWeekDays(weekOffsetByDate || weekOffset || 0, timeZone);
    const dailyHours = getDayHourly(weekOffsetByDate || weekOffset || 0, timeZone);
    const calData = {
      dailyHours: dailyHours,
      weekDays,
    };


    return calData;
  }, [date, weekOffset]);

  return { ...calendarDateState };
}

export default useCalendarDateState;
