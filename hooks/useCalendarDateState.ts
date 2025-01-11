import { useEffect, useState } from "react";
import { calculerEcartSemaine, getDayHourly, getWeekDays } from "../lib/utils";
import { dailyHoursType, weekDaysType } from "../definitions";

function useCalendarDateState(date: Date, weekOffset: number | undefined) {
  const [calendarDateState, setCalendarDateState] = useState<{
    weekDays: weekDaysType;
    dailyHours: dailyHoursType;
  }>({ dailyHours: [], weekDays: [] });

  useEffect(() => {
  
    const weekOffsetByDate = calculerEcartSemaine(date);
    const weekDays = getWeekDays(weekOffsetByDate || weekOffset || 0);
    const dailyHours = getDayHourly(weekOffsetByDate || weekOffset || 0);
    setCalendarDateState({ dailyHours: dailyHours, weekDays });
    
  }, [date, weekOffset]);

  return { ...calendarDateState };
}

export default useCalendarDateState;

