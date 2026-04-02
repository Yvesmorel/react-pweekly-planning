import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import {
  TasksType,
  TaskType,
  TaskFeildsType,
  filterTaskType,
  TimeZone,
  GroupFeildsType,
  dayInfoType,
} from "../definitions";

export const DAY_IN_MILLISECONDS = 86400000;
export const WEEK_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 7;
// Get the current date
const currentDate = new Date();

// Get the day of the week (Sunday = 0, Monday = 1, ..., Saturday = 6)
const currentDayOfWeek = currentDate.getDay();

// Calculate the start date of the week in milliseconds
const startDate = new Date(currentDate);
startDate.setDate(startDate.getDate() - currentDayOfWeek);
startDate.setHours(0, 0, 0, 0);
export const startDateMilliseconds = startDate.getTime();

// Calculate the end date of the week in milliseconds
const endDate = new Date(currentDate);
endDate.setDate(endDate.getDate() + (6 - currentDayOfWeek));
endDate.setHours(23, 59, 59, 999);
export const endDateMilliseconds = endDate.getTime();

export function getDayHourly(weekOffset: number, timeZone?: TimeZone) {
  const dailyHours: {
    positionDay: number;
    day: Date;
    start: number;
    end: number;
  }[] = [];
  let dayOffset = weekOffset;

  const resolvedCurrentDate = getCalendarDate(timeZone);
  const currentDayOfWeek = resolvedCurrentDate.getDay();
  const resolvedStartDate = new Date(resolvedCurrentDate);
  resolvedStartDate.setDate(resolvedStartDate.getDate() - currentDayOfWeek);
  resolvedStartDate.setHours(0, 0, 0, 0);

  // Loop to calculate the start and end hours for each day of the week
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(resolvedStartDate);
    dayDate.setDate(resolvedStartDate.getDate() + i);
    const dayStart = new Date(dayDate);
    dayStart.setHours(1, 0, 0, 0);
    const dayEnd = new Date(dayDate);
    dayEnd.setHours(23, 59, 59, 59);

    dailyHours.push({
      positionDay: i,
      day: new Date(dayStart.getTime() + (dayOffset * DAY_IN_MILLISECONDS)),
      start: dayStart.getTime() + (dayOffset * DAY_IN_MILLISECONDS),
      end: dayEnd.getTime() + (dayOffset * DAY_IN_MILLISECONDS),
    });
  }
  return dailyHours;
}

/**
 * Get daily hours for all days of a specific month.
 * @param monthOffset - The number of months to offset from current month.
 * @param timeZone - The optional timezone.
 * @returns An array of day objects containing start and end timestamps.
 */
export function getDayHourlyForMonth(monthOffset: number, timeZone?: TimeZone) {
  const dailyHours: {
    positionDay: number;
    day: Date;
    start: number;
    end: number;
  }[] = [];

  const currentDate = getCalendarDate(timeZone);
  const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(year, month, i);
    const dayStart = new Date(dayDate);
    dayStart.setHours(1, 0, 0, 0);
    const dayEnd = new Date(dayDate);
    dayEnd.setHours(23, 59, 59, 99); // Adjusted for consistency

    dailyHours.push({
      positionDay: i - 1,
      day: dayDate,
      start: dayStart.getTime(),
      end: dayEnd.getTime(),
    });
  }
  return dailyHours;
}

// Convert milliseconds to a readable date format
export function millisecondsToDate(milliseconds: number) {
  const date = new Date(milliseconds);
  const daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Frid", "Sat", "Sun"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${hours.toString().padStart(2, "0")}h:${minutes
    .toString()
    .padStart(2, "0")}`;
  return { formattedDate, dayOfWeek };
}

// Convert milliseconds to integer representation
export function millisecondsToInt(milliseconds: number) {
  const date = new Date(milliseconds);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  let hours = date.getHours();
  const amOrPm = hours >= 12 ? " pm" : " am";
  const minutes = date.getMinutes();
  const formattedDate = hours.toString().padStart(2, "0");
  return { formattedDate, dayOfWeek };
}

// Get days of the week with a jump offset
export function getWeekDays(jump: number, timeZone?: TimeZone) {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Frid", "Sat"];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = getCalendarDate(timeZone);
  const currentDayOfWeek = currentDate.getDay();
  let weekDays = [];

  for (let i = 0; i < 7; i++) {
    const day = getCalendarDate(timeZone);
    const diff = i - currentDayOfWeek;

    day.setDate(currentDate.getDate() + diff + jump);

    const formattedDay = `${days[day.getDay()]}. ${day.getDate()}, ${month[day.getMonth()]
      } ${day.getFullYear()}`;
    weekDays.push({
      day: days[day.getDay()],
      dayMonth: month[day.getMonth()],
      dayYear: day.getFullYear(),
      dayOfTheMonth: day.getDate(),
    });
  }
  return weekDays;
}

/**
 * Get days of a specific month with an offset.
 * @param monthOffset - The number of months to offset from current month.
 * @param timeZone - The optional timezone.
 * @returns An array of day metadata for the target month.
 */
export function getMonthDay(monthOffset: number, timeZone?: TimeZone) {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Frid", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = getCalendarDate(timeZone);

  // Focus on the first of the month targetted by monthOffset
  const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let monthDays = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(year, month, d);
    monthDays.push({
      day: days[dayDate.getDay()],
      dayMonth: monthNames[dayDate.getMonth()],
      dayYear: dayDate.getFullYear(),
      dayOfTheMonth: dayDate.getDate(),
    });
  }
  return monthDays;
}

// The remaining functions follow the same structure. Ensure all comments are in English and make the functions exportable as required.

/**
 * Get the ISO week number for a given date.
 * @param date - The date to get the week number for.
 * @returns The ISO week number.
 */
function getWeekNumber(date: Date): number {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
  const yearStart = new Date(tempDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / DAY_IN_MILLISECONDS + 1) / 7
  );
  return weekNumber;
}

/**
 * Update the selected date to avoid issues with weeks starting on Sunday.
 * @param dateSelectionnee - The selected date.
 * @returns The updated date.
 */
function updateSelectedDateForEcartSemaine(dateSelectionnee: Date): Date {
  const updatedDate = new Date(dateSelectionnee.getTime());
  if (updatedDate.getDay() === 0) {
    updatedDate.setDate(updatedDate.getDate() + 1);
  }
  return updatedDate;
}

/**
 * Calculate the week difference between the selected date and the current date.
 * @param dateSelectionnee - The selected date.
 * @returns The week difference in days.
 */


export function calculateWeekDifference(dateSelectionnee: Date, timeZone?: TimeZone): number {
  const dateActuelle = getCalendarDate(timeZone);


  // 1. Retrieve only the year, month, and day, and force it to midnight UTC.
  // This eliminates any risk related to time zones and daylight saving time.
  const utcSelected = Date.UTC(typeof dateSelectionnee === "string" ? new Date(dateSelectionnee).getFullYear() : dateSelectionnee.getFullYear(), typeof dateSelectionnee === "string" ? new Date(dateSelectionnee).getMonth() : dateSelectionnee.getMonth(), typeof dateSelectionnee === "string" ? new Date(dateSelectionnee).getDate() : dateSelectionnee.getDate());
  const utcActuelle = Date.UTC(dateActuelle.getFullYear(), dateActuelle.getMonth(), dateActuelle.getDate());

  const MS_PAR_JOUR = 86400000;

  // 2. Resize each date to the Sunday of its corresponding week.

  // getDay() returns a number from 0 (Sunday) to 6 (Saturday).

  // By subtracting (day * ms_per_day), we arrive at Sunday at midnight.
  const dimancheSelected = utcSelected - (typeof dateSelectionnee === "string" ? new Date(dateSelectionnee).getDay() : dateSelectionnee.getDay() * MS_PAR_JOUR);
  const dimancheActuelle = utcActuelle - (dateActuelle.getDay() * MS_PAR_JOUR);


  const ecartJours = Math.round((dimancheSelected - dimancheActuelle) / MS_PAR_JOUR);

  return ecartJours; // Retournera 0, 7, -7, 14, -14...
}

/**
 * Calculate the day difference between the selected date and the current date.
 * @param dateSelectionnee - The selected date.
 * @param timeZone - The optional timezone.
 * @returns The difference in days.
 */
export function calculateDayDifference(dateSelectionnee: Date, timeZone?: TimeZone): number {
  const dateActuelle = getCalendarDate(timeZone);

  const utcSelected = Date.UTC(
    typeof dateSelectionnee === "string" ? new Date(dateSelectionnee).getFullYear() : dateSelectionnee.getFullYear(),
    typeof dateSelectionnee === "string" ? new Date(dateSelectionnee).getMonth() : dateSelectionnee.getMonth(),
    typeof dateSelectionnee === "string" ? new Date(dateSelectionnee).getDate() : dateSelectionnee.getDate()
  );
  const utcActuelle = Date.UTC(
    dateActuelle.getFullYear(),
    dateActuelle.getMonth(),
    dateActuelle.getDate()
  );

  const MS_PAR_JOUR = 86400000;
  return Math.round((utcSelected - utcActuelle) / MS_PAR_JOUR);
}

/**
 * Calculate the month difference between the selected date and the current date.
 * @param dateSelectionnee - The selected date.
 * @param timeZone - The optional timezone.
 * @returns The difference in months.
 */
export function calculateMonthDifference(dateSelectionnee: Date, timeZone?: TimeZone): number {
  const dateActuelle = getCalendarDate(timeZone);

  const selectedDate = typeof dateSelectionnee === "string" ? new Date(dateSelectionnee) : dateSelectionnee;

  const yearDiff = selectedDate.getFullYear() - dateActuelle.getFullYear();
  const monthDiff = selectedDate.getMonth() - dateActuelle.getMonth();

  return yearDiff * 12 + monthDiff;
}

/**
 * Calculate the number of weeks since an arbitrary origin date (January 1, 2022).
 * @param annee - The year.
 * @param numeroSemaine - The week number.
 * @returns The number of weeks since the origin date.
 */


export function getNewTaskForDropOrPaste(
  positionDay: number,
  dropGroupId: string,
  getTask: (hash: string, taskId: string) => TaskFeildsType | undefined,
  hash: string
) {
  const dragtaskId = window.sessionStorage.getItem("calendardragtaskId");
  const dragtaskStart = window.sessionStorage.getItem("calendardragtaskStart");
  const dragtaskEnd = window.sessionStorage.getItem("calendardragtaskEnd");
  const dragdayIndex = window.sessionStorage.getItem("calendardragdayIndex");
  const draghash = window.sessionStorage.getItem("calendardraghash");
  let newTask: TaskFeildsType | any;

  window.sessionStorage.clear();


  if (!dragdayIndex || !dragtaskStart || !dragtaskEnd || !dragtaskId)
    return;
  const convertTaskDropStart = new Date(parseInt(dragtaskStart));


  if (draghash === null) return
  const dragTask = getTask(draghash, dragtaskId)


  if (!dragTask) return;

  const dayIndex = parseInt(dragdayIndex);
  let ecartDaysIndex = positionDay - dayIndex;

  convertTaskDropStart.setDate(convertTaskDropStart.getDate() + ecartDaysIndex);
  const taskDropStart = convertTaskDropStart.getTime();
  let convertTaskDropEnd = new Date(parseInt(dragtaskEnd));
  convertTaskDropEnd.setDate(convertTaskDropEnd.getDate() + ecartDaysIndex);
  const taskDropEnd = convertTaskDropEnd.getTime();
  const taskDropDate = new Date(taskDropStart);
  if (dragTask) {
    const { taskStart, taskEnd, taskDate, groupId, dayIndex, ...rest } =
      dragTask;

    newTask = {

      taskStart: taskDropStart,
      taskEnd: taskDropEnd,
      taskDate: taskDropDate,
      groupId: dropGroupId,
      dayIndex: positionDay,
      ...rest,
      hash: hash,
      draghash: draghash,

    };

  }
  return { taskDropStart, taskDropEnd, taskDropDate, newTask };
}

export function compareWeekOffset(
  calendarDate: Date,
  weekOffset: number,
  taskDate: Date,
  timeZone?: TimeZone
) {
  // if (taskDate.getDay() === 0 && calculateWeekDifference(taskDate) === -7) {
  //   return true;
  // }


  const currentDate = getCalendarDate(timeZone);
  const currentWeekOffset = calculateWeekDifference(currentDate, timeZone);
  const localTaskDate = getArbitraryDateInTimeZone(taskDate, timeZone);


  // if (calendarDate)
  //     return (calculateWeekDifference(calendarDate) === calculateWeekDifference(taskDate));


  const ecartTask = calculateWeekDifference(taskDate, timeZone)

  return weekOffset === ecartTask;
}

export function compareMonthOffset(
  monthOffset: number,
  taskDate: Date,
  timeZone?: TimeZone
) {
  const ecartTask = calculateMonthDifference(taskDate, timeZone)
  return monthOffset === ecartTask;
}

export function compareDayOffset(
  dayOffset: number,
  taskDate: Date,
  timeZone?: TimeZone
) {
  const ecartTask = calculateDayDifference(taskDate, timeZone)
  return dayOffset === ecartTask;
}

export const sumHoursByGroups = (
  groupId: string,
  tasks: TasksType | any,
  weekOffset: number,
  calendarDate: Date,
  timeZone?: TimeZone
) => {
  let sum: number = 0;
  if (tasks)
    tasks.forEach((task: TaskType | any) => {
      if (
        task.groupId === groupId &&
        compareWeekOffset(calendarDate, weekOffset, task.taskDate, timeZone) === true
      ) {
        sum += task.taskEnd - task.taskStart;
      }
    });
  return sum;
};

export const sumHoursByGroupsForMonth = (
  groupId: string,
  tasks: TasksType | any,
  monthOffset: number,
  timeZone?: TimeZone
) => {
  let sum: number = 0;
  if (tasks)
    tasks.forEach((task: TaskType | any) => {
      if (
        task.groupId === groupId &&
        compareMonthOffset(monthOffset, task.taskDate, timeZone) === true
      ) {
        sum += task.taskEnd - task.taskStart;
      }
    });
  return sum;
};

export const sumHoursByGroupsForDay = (
  groupId: string,
  tasks: TasksType | any,
  dayOffset: number,
  timeZone?: TimeZone
) => {
  let sum: number = 0;
  if (tasks)
    tasks.forEach((task: TaskType | any) => {
      if (
        task.groupId === groupId &&
        compareDayOffset(dayOffset, task.taskDate, timeZone) === true
      ) {
        sum += task.taskEnd - task.taskStart;
      }
    });
  return sum;
};

export function saveTasksToLocalStorage(tasks: TasksType) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("Calendar", "je marche");
    const tasksSavedString = window.localStorage.getItem("CalendarTaskSaved");
    const tasksString = JSON.stringify(tasks);
    if (tasksSavedString === tasksString) return;
    if (tasksString === "[]") return;
    const backup = [
      ...tasks.filter((task) => {
        {
          if (task?.taskExpiryDate) {
            const taskDate = new Date(task?.taskExpiryDate);
            return taskDate.getTime() >= Date.now();
          }
        }
      }),
    ];
    window.localStorage.setItem("CalendarTaskSaved", JSON.stringify(backup));
  }
}

export const updateCalendarDateWithOffset = (
  offset: number,
  timeZone?: TimeZone
) => {
  const newDate = getCalendarDate(timeZone);
  newDate.setDate(newDate.getDate() + offset);
  return newDate;
};

export const updateOffsetWithDateCalendar = (calendarDate: Date, timeZone?: TimeZone) => {
  if (typeof calendarDate === 'string') {


    return calculateWeekDifference(new Date(calendarDate), timeZone);
  }

  return calculateWeekDifference(calendarDate, timeZone);
};

export const updateOffsetWithDateCalendarForMonth = (calendarDate: Date, timeZone?: TimeZone) => {
  if (typeof calendarDate === 'string') {
    return calculateMonthDifference(new Date(calendarDate), timeZone);
  }
  return calculateMonthDifference(calendarDate, timeZone);
};

export const updateOffsetWithDateCalendarForDay = (calendarDate: Date, timeZone?: TimeZone) => {
  if (typeof calendarDate === 'string') {
    return calculateDayDifference(new Date(calendarDate), timeZone);
  }
  return calculateDayDifference(calendarDate, timeZone);
};

export const millisecondsToHours = (milliseconds: number) => {
  return millisecondsToDate(milliseconds).formattedDate;
};

export const checkDuplicates = (
  tasks: TasksType,
  taskStart: number,
  taskEnd: number,
  groupId: string
) => {
  const findDuplicates = tasks
    ?.filter(
      (task) =>
        (taskStart >= task.taskStart && taskStart < task.taskEnd) ||
        (taskEnd > task.taskStart && taskEnd < task.taskEnd) ||
        (taskStart <= task.taskStart &&
          taskEnd > task.taskStart &&
          taskEnd >= task.taskEnd &&
          taskStart <= task.taskEnd)
    )
    .filter((task) => task.groupId === groupId);
  return findDuplicates.length > 0;
};

export const getSavedTasks = () => {
  const taskSavedString = window.localStorage.getItem("CalendarTaskSaved");
  if (!taskSavedString) {
    return [];
  }
  const tasksTable: TasksType = JSON.parse(taskSavedString);

  const savedTasks: TasksType | any = tasksTable.map((task) => {
    const { taskDate, taskExpiryDate, ...rest } = task;



    if (taskExpiryDate) {
      return {
        taskDate: new Date(taskDate),
        taskExpiryDate: new Date(taskExpiryDate),
        ...rest,
      };
    }
  });
  return savedTasks;
};

export const deleteTaskSaved = (taskId: string) => {
  const tasksSavedString = window.localStorage.getItem("CalendarTaskSaved");
  if (!tasksSavedString) return;
  const tasksSavedTable: TasksType = JSON.parse(tasksSavedString);
  const taskIndex = tasksSavedTable.findIndex((task) => task.id === taskId);

  if (taskIndex) {
    tasksSavedTable.splice(taskIndex, 1);
    window.localStorage.setItem(
      "CalendarTaskSaved",
      JSON.stringify(tasksSavedTable)
    );
  }
};

export const deleteTasksSaved = () => {
  window.localStorage.removeItem("CalendarTaskSaved");
};

export function getWeeksInMonth(year: number, month: number) {
  // Create a new date object for the first day of the given month
  const firstDay = new Date(year, month, 1);

  // Create a new date object for the last day of the given month
  const lastDay = new Date(year, month + 1, 0);

  // Get the day of the week of the first day of the month
  const startDay = firstDay.getDay();

  // Get the number of days in the month
  const daysInMonth = lastDay.getDate();

  // Calculate the number of weeks
  const weeks = Math.ceil((daysInMonth + startDay) / 7);

  return weeks;
}

export function getMonthNumber(monthName: string) {
  // List of months in order
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert the month name to the corresponding month index
  const monthIndex = months.indexOf(monthName);

  // If the month name is valid, return its index (0-based)
  if (monthIndex !== -1) {
    return monthIndex;
  } else {
    // Return -1 if the month name is invalid
    console.error("Invalid month name");
    return -1;
  }
}

export function getDateObjectInTimeZone(timeZone: string) {
  try {
    let date = new Date(
      new Date().toLocaleString("en-US", { timeZone: timeZone })
    );

    return date;
  } catch (error) {
    return new Date();
  }
}

/**
 * Returns the current date according to the selected timezone or the local time.
 * @param timeZone - The optional timezone.
 * @returns The current date.
 */
export function getCalendarDate(timeZone?: TimeZone): Date {
  return timeZone ? getDateObjectInTimeZone(timeZone) : new Date();
}

export function getArbitraryDateInTimeZone(date: Date, timeZone?: string) {
  if (!timeZone) return date;
  try {
    return new Date(
      date.toLocaleString("en-US", { timeZone: timeZone })
    );
  } catch (error) {
    return date;
  }
}

function recurring(ecartDay: number, task: TaskFeildsType, timeZone?: TimeZone) {
  const newTask = { ...task };

  newTask.taskStart = newTask.taskStart + ecartDay;
  newTask.taskEnd = newTask.taskEnd + ecartDay;

  if (newTask.taskExpiryDate)
    newTask.taskExpiryDate = new Date(
      newTask.taskExpiryDate.getTime() + ecartDay
    );

  newTask.taskDate = new Date(newTask.taskStart);

  newTask.dayIndex = getArbitraryDateInTimeZone(newTask.taskDate, timeZone).getDay();

  newTask.id = getUniqueId();
  return newTask;
}

export function recurringTasks(
  allTasks: TasksType,
  task: TaskFeildsType,
  recurrenceType: "daily" | "weekly" | "monthly",
  occurrences: number,
  timeZone?: TimeZone
): TaskFeildsType[] {
  const tasks: TaskFeildsType[] = [];

  function daily() {
    for (let i = 0; i < occurrences; i++) {
      // Create a copy of the task with updated taskDate for each day
      const newTask = recurring(i * DAY_IN_MILLISECONDS, task, timeZone);

      if (
        !checkDuplicates(
          allTasks,
          newTask.taskStart,
          newTask.taskEnd,
          task.groupId
        )
      ) {
        tasks.push(newTask);
      }
    }
  }

  function weekly() {
    for (let i = 0; i < occurrences; i++) {
      // Create a copy of the task with updated taskDate for each week
      const newTask = recurring(i * WEEK_IN_MILLISECONDS, task, timeZone);
      if (
        !checkDuplicates(
          allTasks,
          newTask.taskStart,
          newTask.taskEnd,
          task.groupId
        )
      ) {
        tasks.push(newTask);
      }
    }
  }

  function monthly() {
    for (let i = 0; i < occurrences; i++) {
      // Create a copy of the task with updated taskDate for each week
      const newTask = recurring(
        dayjs(task.taskDate).daysInMonth() * i * DAY_IN_MILLISECONDS,
        task,
        timeZone
      );

      if (
        !checkDuplicates(
          allTasks,
          newTask.taskStart,
          newTask.taskEnd,
          task.groupId
        )
      ) {
        tasks.push(newTask);
      }
    }
  }

  // Execute the correct recurrence function based on the type
  if (recurrenceType === "daily") {
    daily();
  } else if (recurrenceType === "weekly") {
    weekly();
  } else if (recurrenceType === "monthly") {
    monthly();
  }



  // Return the list of generated tasks
  return tasks;
}

export function getHoursByday(
  tasks: TaskFeildsType[],
  dayIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  weekOffset?: number,
  timeZone?: TimeZone
) {
  const sum = tasks.reduce((currentSum: number, task: TaskFeildsType) => {
    if (
      task.dayIndex === dayIndex &&
      weekOffset === updateOffsetWithDateCalendar(task.taskDate, timeZone)
    )
      return (
        currentSum +
        Math.ceil((task.taskEnd - task.taskStart) / DAY_IN_MILLISECONDS)
      );
    return currentSum;
  }, 0);
  return sum;
}

export function getHoursByGroup(
  tasks: TaskFeildsType[],
  groupId: string,
  weekOffset?: number,
  timeZone?: TimeZone
) {
  const sum = tasks.reduce((currentSum: number, task: TaskFeildsType) => {
    if (
      task.groupId === groupId &&
      weekOffset === updateOffsetWithDateCalendar(task.taskDate, timeZone)
    )
      return (
        currentSum +
        Math.ceil((task.taskEnd - task.taskStart) / DAY_IN_MILLISECONDS)
      );
    return currentSum;
  }, 0);

  return sum;
}

export function getTaskProgression(task: TaskFeildsType, timeZone?: TimeZone) {
  const now = getCalendarDate(timeZone);

  if (task.taskStart >= now.getTime()) return 0;
  if (now.getTime() >= task.taskEnd) return 100;

  const progression =
    ((now.getTime() - task.taskStart) / (task.taskEnd - task.taskStart)) * 100;

  return progression.toFixed(0);
}

export function convertTasksToIcsFormat(tasks: TaskFeildsType[]) {
  const ics = tasks.reduce((previousIcs: string, task: TaskFeildsType) => {
    previousIcs += `

        BEGIN:VCALENDAR
        VERSION:1.0
        BEGIN:VEVENT
        DTSTART:${task.taskStart}
        DTEND:${task.taskEnd}
        LOCATION:
        DESCRIPTION:Purpose: Provide example of this file type Document file type: ICS Version: 1.0 Created by http://www.online-convert.com More example files: http://www.online-convert.com/file-type License: http://creativecommons.org/licenses Feel free to use & share the file according to the license above.
        SUMMARY:ICS test file
        PRIORITY:3
        END:VEVENT
        END:VCALENDAR

    `;

    return previousIcs;
  }, "");

  return ics;
}

export function addTask(tasks: TaskFeildsType[], task: TaskFeildsType) {
  return [...tasks, task];
}

export function deleteTask(tasks: TaskFeildsType[], taskId: string) {
  const taskPos = tasks.findIndex((task) => task.id === taskId);
  const alltasks = [...tasks];

  alltasks.splice(taskPos, 1);
  return alltasks;
}

export function getTaskInfoById(
  tasks: TaskFeildsType[],
  groups: GroupFeildsType[],
  taskId: string
) {
  const task = tasks.find((task) => task.id === taskId);
  if (!task) throw new Error("no such to task");

  const group = groups.find((group) => group.id === task.groupId);

  return {
    group,
    task,
  };
}

export function selectTask(task: TaskFeildsType) {
  if (typeof window !== "undefined") {
    const copiedTasks: TaskFeildsType[] = JSON.parse(
      window.sessionStorage.getItem("copiedTasks") || "[]"
    );

    if (copiedTasks.length > 0) {
      window.sessionStorage.setItem(
        "copiedTasks",
        JSON.stringify([...copiedTasks, task])
      );
    } else window.sessionStorage.setItem("copiedTasks", JSON.stringify([task]));
  }
}

export function deSelectTask(task: TaskFeildsType) {
  if (typeof window !== "undefined") {
    const copiedTasks: TaskFeildsType[] = JSON.parse(
      window.sessionStorage.getItem("copiedTasks") || "[]"
    );

    if (copiedTasks.length > 0) {
      const newTasks = deleteTask(copiedTasks, task.id);

      window.sessionStorage.setItem(
        "copiedTasks",
        JSON.stringify([...newTasks])
      );
    } else throw new Error("Sorry there are no tasks to select");
  }
}

export function copyTasks(task: TaskFeildsType) {
  selectTask(task);
}

export function cutTasks(task: TaskFeildsType, tasks: TaskFeildsType[]) {
  copyTasks(task);
  const newTasks = deleteTask(tasks, task.taskId);
  return newTasks;
}

function updateTaskStartTimeAnEndTime(
  start: number,
  end: number,
  calendarOffset: number,
  dayIndex: number,
  taskPosition: number,
  timeZone?: TimeZone
) {
  const diffDay =
    dayIndex +
    calendarOffset -
    (taskPosition + updateOffsetWithDateCalendar(new Date(start), timeZone));

  const startTime = start + diffDay * DAY_IN_MILLISECONDS;
  const endTime = end + diffDay * DAY_IN_MILLISECONDS;
  return { startTime, endTime };
}

export function getUniqueId() {
  const uid = uuidv4();
  return uid;
}
export function pastTasks(
  dayInfo: dayInfoType,
  groupId: string,
  tasks: TaskFeildsType[],
  taskExpiryDate?: Date,
  timeZone?: TimeZone
) {
  if (typeof window !== "undefined") {
    const copiedTasks: TaskFeildsType[] = JSON.parse(
      window.sessionStorage.getItem("copiedTasks") || "[]"
    );

    if (copiedTasks.length > 0) {
      const newTasks = copiedTasks.reduce(
        (previousTasks: TaskFeildsType[], task: TaskFeildsType) => {
          const {
            dayIndex: copiedTaskDayIndex,
            taskStart: copiedTasktaskStart,
            taskEnd: copiedTasktaskEnd,
            taskDate: copiedTasktaskDate,
            groupId: copiedTaskGroupId,
            id: copiedTaskId,
            taskExpiryDate: copiedTaskExpiryDate,
            ...rest
          } = task;

          const newTaskStartAndEnd = updateTaskStartTimeAnEndTime(
            copiedTasktaskStart,
            copiedTasktaskEnd,
            updateOffsetWithDateCalendar(dayInfo.day, timeZone),
            dayInfo.positionDay,
            copiedTaskDayIndex,
            timeZone
          );

          if (
            !checkDuplicates(
              previousTasks,
              newTaskStartAndEnd.startTime,
              newTaskStartAndEnd.endTime,
              groupId
            )
          ) {
            const newTaskDate = new Date(newTaskStartAndEnd.startTime);
            const newTaskId = `${getUniqueId()}`;
            const newTask: TaskFeildsType = {
              taskStart: newTaskStartAndEnd.startTime,
              taskEnd: newTaskStartAndEnd.endTime,
              dayIndex: dayInfo.positionDay,
              id: newTaskId,
              taskDate: newTaskDate,
              groupId: groupId,
              taskExpiryDate: taskExpiryDate,
              ...rest,
            };

            return [...previousTasks, newTask];
          } else return previousTasks;
        },

        []
      );
      window.sessionStorage.removeItem("copiedTasks");

      return [...tasks, ...newTasks];
    } else throw new Error("no past task(s)");
  }
}

export function updateTask(
  tasks: TaskFeildsType[],
  taskId: string,
  newtask: TaskFeildsType
) {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return newtask;
    }
    return task;
  });
}

export function duplicateTasksForPeriod(
  periodStart: Date,
  periodEnd: Date,
  calendarOffset: number,
  allTasks: TasksType
): TasksType {
  if (periodStart > periodEnd)
    throw new Error("period Start is after period End");

  let tasks: TasksType = [...allTasks];

  const currentWeekallTasks = allTasks.filter(
    (planning) => planning.offset === calendarOffset
  );

  for (
    let dayInMilliseconds = periodStart.getTime();
    dayInMilliseconds <= periodEnd.getTime();
    dayInMilliseconds += DAY_IN_MILLISECONDS
  ) {
    const dayIndex = new Date(dayInMilliseconds).getDay();

    const findPlanning: TasksType = currentWeekallTasks.filter(
      (planning) => planning.dayIndex === dayIndex
    );

    if (findPlanning.length > 0) {
      findPlanning.forEach((plan) => {
        const { taskStart, taskEnd, taskDate, offset, id, ...rest } = plan;

        const newOffset = updateOffsetWithDateCalendar(periodEnd);

        const ecartDay = Math.round(
          (periodEnd.getTime() - periodStart.getTime()) / DAY_IN_MILLISECONDS
        );

        const newTaskStart = taskStart + ecartDay * DAY_IN_MILLISECONDS;
        const newTaskEnd = taskEnd + ecartDay * DAY_IN_MILLISECONDS;
        const newTaskDate = new Date(
          taskDate.getTime() + ecartDay * DAY_IN_MILLISECONDS
        );

        if (
          !checkDuplicates(allTasks, newTaskStart, newTaskEnd, rest.groupId)
        ) {
          const newTask: TaskFeildsType = {
            ...rest,
            taskDate: newTaskDate,
            taskStart: newTaskStart,
            taskEnd: newTaskEnd,
            id: getUniqueId(),
          };

          tasks.push({ ...newTask, offset: newOffset });
        }
      });
    }
  }

  return tasks;
}

export function duplicateTaskForPeriod(
  periodStart: Date,
  periodEnd: Date,
  task: TaskFeildsType,
  ecartDay?: number,
  groupId?: string,
  taskExpiryDate?: Date
): TasksType {
  if (periodStart >= periodEnd)
    throw new Error("period Start is after period End");

  let allTasks: TasksType = [];

  for (
    let dayInMilliseconds = periodStart.getTime();
    dayInMilliseconds <= periodEnd.getTime();
    dayInMilliseconds += ecartDay
      ? DAY_IN_MILLISECONDS * ecartDay
      : DAY_IN_MILLISECONDS
  ) {
    const {
      taskStart,
      taskEnd,
      taskDate,
      offset,
      id,
      groupId: currentTaskGroupId,
      taskExpiryDate: currentTaskExpiryDate,
      ...rest
    } = task;

    const newOffset = updateOffsetWithDateCalendar(periodEnd);

    const ecartDay = Math.round(
      (dayInMilliseconds - taskDate.getTime()) / DAY_IN_MILLISECONDS
    );

    const newTaskStart = taskStart + ecartDay * DAY_IN_MILLISECONDS;

    const newTaskEnd = taskEnd + ecartDay * DAY_IN_MILLISECONDS;

    const newTaskDate = new Date(
      taskDate.getTime() + ecartDay * DAY_IN_MILLISECONDS
    );

    if (!checkDuplicates(allTasks, newTaskStart, newTaskEnd, rest.groupId)) {
      const newTask: TaskFeildsType = {
        ...rest,
        taskDate: newTaskDate,
        taskStart: newTaskStart,
        taskEnd: newTaskEnd,
        id: getUniqueId(),
        groupId: groupId ? groupId : currentTaskGroupId,
        taskExpiryDate: taskExpiryDate,
      };

      allTasks.push({ ...newTask, offset: newOffset });
    }
  }

  return allTasks;
}

export const GetTimeRangeByDay = (start: number, end: number) => {
  const hourToMillisecond = 3600000;
  const range = [];
  for (let i = start; i < end; i += hourToMillisecond) {
    range.push(i);
  }
  return range;
};

export function totalLabel(milliseconds: number) {
  let label = "";
  const hourConv = milliseconds / 3600000;

  const truncHour = Math.trunc(hourConv);

  if (hourConv !== truncHour) {
    const deciHour = hourConv - truncHour;
    const minConv = deciHour * 60;
    const truncMin = Math.trunc(minConv);

    if (truncMin !== minConv) {
      const deciMin = minConv - truncMin;
      const secConv = deciMin * 60;
      label = `${truncHour}:${truncMin}:${Math.trunc(secConv)}`;
    } else label = `${truncHour}:${minConv}:0`;
  } else label = `${hourConv}:0:0`;

  return label;
}


export function getHash(weekOffset: number, groupId?: string, dayIndex?: number,) {
  return {
    "week": `${weekOffset}`,
    "group": `${weekOffset}/${groupId}`,
    "day": `${weekOffset}/${groupId}/${dayIndex}`
  }
}