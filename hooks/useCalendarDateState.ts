import { useEffect, useState } from "react";
import {
  calculerEcartSemaine,
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
  timeZone: TimeZone | undefined
) {
  const [calendarDateState, setCalendarDateState] = useState<{
    weekDays: weekDaysType;
    dailyHours: dailyHoursType;
  }>({ dailyHours: [], weekDays: [] });

  useEffect(() => {
    const weekOffsetByDate = timeZone
      ? calculerEcartSemaine(getDateObjectInTimeZone(timeZone))
      : calculerEcartSemaine(date);

    const weekDays = getWeekDays(weekOffsetByDate || weekOffset || 0);
    const dailyHours = getDayHourly(weekOffsetByDate || weekOffset || 0);
    const calData = {
      dailyHours: dailyHours,
      weekDays,
    };

    setCalendarDateState(calData);
  }, [date, weekOffset]);

  return { ...calendarDateState };
}

export default useCalendarDateState;
