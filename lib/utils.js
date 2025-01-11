var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import moment from "moment";
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
export function getDayHourly(weekOffset) {
    const dailyHours = [];
    let dayOffset = weekOffset;
    // Adjust the offset if the current day is Sunday
    if (currentDate.getDay() === 0) {
        dayOffset = dayOffset - 7;
    }
    // Loop to calculate the start and end hours for each day of the week
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i);
        const dayStart = new Date(dayDate);
        dayStart.setHours(1, 0, 0, 0);
        const dayEnd = new Date(dayDate);
        dayEnd.setHours(23, 59, 59, 59);
        dailyHours.push({
            positionDay: i,
            day: new Date(dayStart.getTime() + dayOffset * 86400000),
            start: dayStart.getTime() + dayOffset * 86400000,
            end: dayEnd.getTime() + dayOffset * 86400000,
        });
    }
    return dailyHours;
}
// Convert milliseconds to a readable date format
export function millisecondsToDate(milliseconds) {
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
export function millisecondsToInt(milliseconds) {
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
export function getWeekDays(jump) {
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
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    let weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date();
        const diff = i - currentDayOfWeek;
        if (currentDayOfWeek === 0) {
            day.setDate(currentDate.getDate() + diff + jump - 7);
        }
        else {
            day.setDate(currentDate.getDate() + diff + jump);
        }
        const formattedDay = `${days[day.getDay()]}. ${day.getDate()}, ${month[day.getMonth()]} ${day.getFullYear()}`;
        weekDays.push({
            day: days[day.getDay()],
            dayMonth: month[day.getMonth()],
            dayYear: day.getFullYear(),
            dayOfTheMonth: day.getDate(),
        });
    }
    return weekDays;
}
// The remaining functions follow the same structure. Ensure all comments are in English and make the functions exportable as required.
/**
 * Get the ISO week number for a given date.
 * @param date - The date to get the week number for.
 * @returns The ISO week number.
 */
function getWeekNumber(date) {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNumber;
}
/**
 * Update the selected date to avoid issues with weeks starting on Sunday.
 * @param dateSelectionnee - The selected date.
 * @returns The updated date.
 */
function updateSelectedDateForEcartSemaine(dateSelectionnee) {
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
export function calculerEcartSemaine(dateSelectionnee) {
    if (!dateSelectionnee) {
        return 0;
    }
    const selectedDateUpdated = updateSelectedDateForEcartSemaine(dateSelectionnee);
    const dateActuelle = new Date();
    const anneeActuelle = dateActuelle.getFullYear();
    const numeroSemaineActuelle = getWeekNumber(dateActuelle);
    const anneeSelectionnee = selectedDateUpdated.getFullYear();
    const numeroSemaineSelectionnee = getWeekNumber(selectedDateUpdated);
    const ecartSemaine = semainesDepuisOrigine(anneeSelectionnee, numeroSemaineSelectionnee) -
        semainesDepuisOrigine(anneeActuelle, numeroSemaineActuelle);
    return ecartSemaine * 7;
}
/**
 * Calculate the number of weeks since an arbitrary origin date (January 1, 2022).
 * @param annee - The year.
 * @param numeroSemaine - The week number.
 * @returns The number of weeks since the origin date.
 */
function semainesDepuisOrigine(annee, numeroSemaine) {
    const dateActuelle = new Date();
    const dateOrigine = new Date(dateActuelle.getFullYear() - 2, 0, 1);
    const anneeOrigine = dateOrigine.getFullYear();
    const numeroSemaineOrigine = getWeekNumber(dateOrigine);
    let nombreSemaines = 0;
    for (let i = anneeOrigine; i < annee; i++) {
        nombreSemaines += moment().year(i).isoWeeksInYear();
    }
    nombreSemaines += numeroSemaine - numeroSemaineOrigine;
    return nombreSemaines;
}
export function getSessionStorageRecordForDragAndDrop(tasks, positionDay, dropGroupId) {
    const dragtaskId = window.sessionStorage.getItem("calendardragtaskId");
    const dragtaskStart = window.sessionStorage.getItem("calendardragtaskStart");
    const dragtaskEnd = window.sessionStorage.getItem("calendardragtaskEnd");
    const dragdayIndex = window.sessionStorage.getItem("calendardragdayIndex");
    let newTask;
    let newTasks = [];
    window.sessionStorage.clear();
    if (!dragdayIndex || !dragtaskStart || !dragtaskEnd || !dragtaskId || !tasks)
        return;
    const dragTask = tasks.find((task) => task.taskId === dragtaskId);
    const dayIndex = parseInt(dragdayIndex);
    let ecartDaysIndex = positionDay - dayIndex;
    const convertTaskDropStart = new Date(parseInt(dragtaskStart));
    convertTaskDropStart.setDate(convertTaskDropStart.getDate() + ecartDaysIndex);
    const taskDropStart = convertTaskDropStart.getTime();
    let convertTaskDropEnd = new Date(parseInt(dragtaskEnd));
    convertTaskDropEnd.setDate(convertTaskDropEnd.getDate() + ecartDaysIndex);
    const taskDropEnd = convertTaskDropEnd.getTime();
    const taskDropDate = new Date(taskDropStart);
    if (dragTask) {
        const { taskStart, taskEnd, taskDate, groupId, dayIndex } = dragTask, rest = __rest(dragTask, ["taskStart", "taskEnd", "taskDate", "groupId", "dayIndex"]);
        newTask = Object.assign({ taskStart: taskDropStart, taskEnd: taskDropEnd, taskDate: taskDropDate, groupId: dropGroupId, dayIndex: positionDay }, rest);
        const dragTaskIndex = tasks.findIndex((task) => task.taskId === dragtaskId);
        newTasks = [...tasks];
        newTasks.splice(dragTaskIndex, 1, newTask);
    }
    return { taskDropStart, taskDropEnd, taskDropDate, newTask, newTasks };
}
export function compareWeekOffset(calendarDate, weekOffset, taskDate) {
    // if (taskDate.getDay() === 0 && calculerEcartSemaine(taskDate) === -7) {
    //   return true;
    // }
    if (calendarDate)
        return (calculerEcartSemaine(calendarDate) === calculerEcartSemaine(taskDate));
    return weekOffset === calculerEcartSemaine(taskDate);
}
export const sumHoursByGroups = (groupId, tasks, weekOffset, calendarDate) => {
    let sum = 0;
    tasks === null || tasks === void 0 ? void 0 : tasks.forEach((task) => {
        if (task.groupId === groupId &&
            compareWeekOffset(calendarDate, weekOffset, task.taskDate) === true) {
            sum += (task.taskEnd - task.taskStart) / 3600000;
        }
    });
    return sum;
};
export function saveTasksToLocalStorage(tasks) {
    if (typeof window !== "undefined") {
        window.localStorage.setItem("Calendar", "je marche");
        const tasksSavedString = window.localStorage.getItem("CalendarTaskSaved");
        const tasksString = JSON.stringify(tasks);
        if (tasksSavedString === tasksString)
            return;
        if (tasksString === "[]")
            return;
        const backup = [
            ...tasks.filter((task) => {
                {
                    if (task === null || task === void 0 ? void 0 : task.taskExpiryDate) {
                        const taskDate = new Date(task === null || task === void 0 ? void 0 : task.taskExpiryDate);
                        return taskDate.getTime() >= Date.now();
                    }
                }
            }),
        ];
        window.localStorage.setItem("CalendarTaskSaved", JSON.stringify(backup));
    }
}
export const updateCalendarDateWithOffset = (offset, calendarDate) => {
    const newDate = new Date(calendarDate);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
};
export const updateOffsetWithDateCalendar = (calendarDate) => {
    return calculerEcartSemaine(calendarDate);
};
export const millisecondsToHours = (milliseconds) => {
    return millisecondsToDate(milliseconds).formattedDate;
};
export const checkDuplicates = (tasks, taskStart, taskEnd, groupId) => {
    const findDuplicates = tasks === null || tasks === void 0 ? void 0 : tasks.filter((task) => (taskStart >= task.taskStart && taskStart < task.taskEnd) ||
        (taskEnd > task.taskStart && taskEnd < task.taskEnd) ||
        (taskStart <= task.taskStart &&
            taskEnd > task.taskStart &&
            taskEnd >= task.taskEnd &&
            taskStart <= task.taskEnd)).filter((task) => task.groupId === groupId);
    return findDuplicates.length > 0;
};
export const getSavedTasks = () => {
    const taskSavedString = window.localStorage.getItem("CalendarTaskSaved");
    if (!taskSavedString) {
        return [];
    }
    const tasksTable = JSON.parse(taskSavedString);
    const savedTasks = tasksTable.map((task) => {
        const { taskDate, taskExpiryDate } = task, rest = __rest(task, ["taskDate", "taskExpiryDate"]);
        if (taskExpiryDate) {
            return Object.assign({ taskDate: new Date(taskDate), taskExpiryDate: new Date(taskExpiryDate) }, rest);
        }
    });
    return savedTasks;
};
export const deleteTaskSaved = (taskId) => {
    const tasksSavedString = window.localStorage.getItem("CalendarTaskSaved");
    if (!tasksSavedString)
        return;
    const tasksSavedTable = JSON.parse(tasksSavedString);
    const taskIndex = tasksSavedTable.findIndex((task) => task.taskId === taskId);
    if (taskIndex) {
        tasksSavedTable.splice(taskIndex, 1);
        window.localStorage.setItem("CalendarTaskSaved", JSON.stringify(tasksSavedTable));
    }
};
export const deleteTasksSaved = () => {
    window.localStorage.removeItem("CalendarTaskSaved");
};
