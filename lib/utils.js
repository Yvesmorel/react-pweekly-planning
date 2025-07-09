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
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
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
            day: new Date(dayStart.getTime() + dayOffset * DAY_IN_MILLISECONDS),
            start: dayStart.getTime() + dayOffset * DAY_IN_MILLISECONDS,
            end: dayEnd.getTime() + dayOffset * DAY_IN_MILLISECONDS,
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
    const weekNumber = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / DAY_IN_MILLISECONDS + 1) / 7);
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
export function getWeeksInMonth(year, month) {
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
export function getMonthNumber(monthName) {
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
    }
    else {
        // Return -1 if the month name is invalid
        console.error("Invalid month name");
        return -1;
    }
}
export function getDateObjectInTimeZone(timeZone) {
    try {
        let date = new Date(new Date().toLocaleString("en-US", { timeZone: timeZone }));
        return date;
    }
    catch (error) {
        return new Date();
    }
}
function recurring(ecartDay, task) {
    const newTask = Object.assign({}, task);
    newTask.taskStart = newTask.taskStart + ecartDay;
    newTask.taskEnd = newTask.taskEnd + ecartDay;
    if (newTask.taskExpiryDate)
        newTask.taskExpiryDate = new Date(newTask.taskExpiryDate.getTime() + ecartDay);
    newTask.taskDate = new Date(newTask.taskStart);
    newTask.dayIndex = newTask.taskDate.getDay();
    newTask.taskId = getUnqueId();
    return newTask;
}
export function recurringTasks(allTasks, task, recurrenceType, occurrences) {
    const tasks = [];
    function daily() {
        for (let i = 0; i < occurrences; i++) {
            // Create a copy of the task with updated taskDate for each day
            const newTask = recurring(i * DAY_IN_MILLISECONDS, task);
            if (!checkDuplicates(allTasks, newTask.taskStart, newTask.taskEnd, task.groupId)) {
                tasks.push(newTask);
            }
        }
    }
    function weekly() {
        for (let i = 0; i < occurrences; i++) {
            // Create a copy of the task with updated taskDate for each week
            const newTask = recurring(i * WEEK_IN_MILLISECONDS, task);
            if (!checkDuplicates(allTasks, newTask.taskStart, newTask.taskEnd, task.groupId)) {
                tasks.push(newTask);
            }
        }
    }
    function monthly() {
        for (let i = 0; i < occurrences; i++) {
            // Create a copy of the task with updated taskDate for each week
            const newTask = recurring(dayjs(task.taskDate).daysInMonth() * i * DAY_IN_MILLISECONDS, task);
            if (!checkDuplicates(allTasks, newTask.taskStart, newTask.taskEnd, task.groupId)) {
                tasks.push(newTask);
            }
        }
    }
    // Execute the correct recurrence function based on the type
    if (recurrenceType === "daily") {
        daily();
    }
    else if (recurrenceType === "weekly") {
        weekly();
    }
    else if (recurrenceType === "monthly") {
        monthly();
    }
    console.log(tasks);
    // Return the list of generated tasks
    return tasks;
}
export function getHoursByday(tasks, dayIndex, weekOffset) {
    const sum = tasks.reduce((currentSum, task) => {
        if (task.dayIndex === dayIndex &&
            weekOffset === updateOffsetWithDateCalendar(task.taskDate))
            return (currentSum +
                Math.ceil((task.taskEnd - task.taskStart) / DAY_IN_MILLISECONDS));
        return currentSum;
    }, 0);
    return sum;
}
export function getHoursByGroup(tasks, groupId, weekOffset) {
    const sum = tasks.reduce((currentSum, task) => {
        if (task.groupId === groupId &&
            weekOffset === updateOffsetWithDateCalendar(task.taskDate))
            return (currentSum +
                Math.ceil((task.taskEnd - task.taskStart) / DAY_IN_MILLISECONDS));
        return currentSum;
    }, 0);
    return sum;
}
export function getTaskProgression(task, timeZone) {
    const now = timeZone ? getDateObjectInTimeZone(timeZone) : new Date();
    if (task.taskStart >= now.getTime())
        return 0;
    if (now.getTime() >= task.taskEnd)
        return 100;
    const progression = ((now.getTime() - task.taskStart) / (task.taskEnd - task.taskStart)) * 100;
    return progression.toFixed(0);
}
export function convertTasksToIcsFormat(tasks) {
    const ics = tasks.reduce((previousIcs, task) => {
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
export function addTask(tasks, task) {
    return [...tasks, task];
}
export function deleteTask(tasks, taskId) {
    const taskPos = tasks.findIndex((task) => task.taskId === taskId);
    const alltasks = [...tasks];
    alltasks.splice(taskPos, 1);
    return alltasks;
}
export function getTaskInfoById(tasks, groups, taskId) {
    const task = tasks.find((task) => task.taskId === taskId);
    if (!task)
        throw new Error("no such to task");
    const group = groups.find((group) => group.id === task.groupId);
    return {
        group,
        task,
    };
}
export function selectTask(task) {
    if (typeof window !== "undefined") {
        const copiedTasks = JSON.parse(window.sessionStorage.getItem("copiedTasks") || "[]");
        if (copiedTasks.length > 0) {
            window.sessionStorage.setItem("copiedTasks", JSON.stringify([...copiedTasks, task]));
        }
        else
            window.sessionStorage.setItem("copiedTasks", JSON.stringify([task]));
    }
}
export function deSelectTask(task) {
    if (typeof window !== "undefined") {
        const copiedTasks = JSON.parse(window.sessionStorage.getItem("copiedTasks") || "[]");
        if (copiedTasks.length > 0) {
            const newTasks = deleteTask(copiedTasks, task.taskId);
            window.sessionStorage.setItem("copiedTasks", JSON.stringify([...newTasks]));
        }
        else
            throw new Error("Sorry there are no tasks to select");
    }
}
export function copyTasks(task) {
    selectTask(task);
}
export function cutTasks(task, tasks) {
    copyTasks(task);
    const newTasks = deleteTask(tasks, task.taskId);
    return newTasks;
}
function updateTaskStartTimeAnEndTime(start, end, calendarOffset, dayIndex, taskPosition) {
    const diffDay = dayIndex +
        calendarOffset -
        (taskPosition + updateOffsetWithDateCalendar(new Date(start)));
    const startTime = start + diffDay * DAY_IN_MILLISECONDS;
    const endTime = end + diffDay * DAY_IN_MILLISECONDS;
    return { startTime, endTime };
}
export function getUnqueId() {
    const uid = uuidv4();
    return uid;
}
export function pastTasks(dayInfo, groupId, tasks, taskExpiryDate) {
    if (typeof window !== "undefined") {
        const copiedTasks = JSON.parse(window.sessionStorage.getItem("copiedTasks") || "[]");
        if (copiedTasks.length > 0) {
            const newTasks = copiedTasks.reduce((previousTasks, task) => {
                const { dayIndex: copiedTaskDayIndex, taskStart: copiedTasktaskStart, taskEnd: copiedTasktaskEnd, taskDate: copiedTasktaskDate, groupId: copiedTaskGroupId, taskId: copiedTaskId, taskExpiryDate: copiedTaskExpiryDate } = task, rest = __rest(task, ["dayIndex", "taskStart", "taskEnd", "taskDate", "groupId", "taskId", "taskExpiryDate"]);
                const newTaskStartAndEnd = updateTaskStartTimeAnEndTime(copiedTasktaskStart, copiedTasktaskEnd, updateOffsetWithDateCalendar(dayInfo.day), dayInfo.positionDay, copiedTaskDayIndex);
                if (!checkDuplicates(previousTasks, newTaskStartAndEnd.startTime, newTaskStartAndEnd.endTime, groupId)) {
                    const newTaskDate = new Date(newTaskStartAndEnd.startTime);
                    const newTaskId = `${getUnqueId()}`;
                    const newTask = Object.assign({ taskStart: newTaskStartAndEnd.startTime, taskEnd: newTaskStartAndEnd.endTime, dayIndex: dayInfo.positionDay, taskId: newTaskId, taskDate: newTaskDate, groupId: groupId, taskExpiryDate: taskExpiryDate }, rest);
                    return [...previousTasks, newTask];
                }
                else
                    return previousTasks;
            }, []);
            window.sessionStorage.removeItem("copiedTasks");
            return [...tasks, ...newTasks];
        }
        else
            throw new Error("Sorry there are no tasks to select");
    }
}
export function updateTask(tasks, taskId, newtask) {
    return tasks.map((task) => {
        if (task.taskId === taskId) {
            return newtask;
        }
        return task;
    });
}
export function duplicateTasksForPeriod(periodStart, periodEnd, calendarOffset, allTasks) {
    if (periodStart > periodEnd)
        throw new Error("period Start is after period End");
    let tasks = [...allTasks];
    const currentWeekallTasks = allTasks.filter((planning) => planning.offset === calendarOffset);
    for (let dayInMilliseconds = periodStart.getTime(); dayInMilliseconds <= periodEnd.getTime(); dayInMilliseconds += DAY_IN_MILLISECONDS) {
        const dayIndex = new Date(dayInMilliseconds).getDay();
        const findPlanning = currentWeekallTasks.filter((planning) => planning.dayIndex === dayIndex);
        if (findPlanning.length > 0) {
            findPlanning.forEach((plan) => {
                const { taskStart, taskEnd, taskDate, offset, taskId } = plan, rest = __rest(plan, ["taskStart", "taskEnd", "taskDate", "offset", "taskId"]);
                const newOffset = updateOffsetWithDateCalendar(periodEnd);
                const ecartDay = Math.round((periodEnd.getTime() - periodStart.getTime()) / DAY_IN_MILLISECONDS);
                const newTaskStart = taskStart + ecartDay * DAY_IN_MILLISECONDS;
                const newTaskEnd = taskEnd + ecartDay * DAY_IN_MILLISECONDS;
                const newTaskDate = new Date(taskDate.getTime() + ecartDay * DAY_IN_MILLISECONDS);
                if (!checkDuplicates(allTasks, newTaskStart, newTaskEnd, rest.groupId)) {
                    const newTask = Object.assign(Object.assign({}, rest), { taskDate: newTaskDate, taskStart: newTaskStart, taskEnd: newTaskEnd, taskId: getUnqueId() });
                    tasks.push(Object.assign(Object.assign({}, newTask), { offset: newOffset }));
                }
            });
        }
    }
    return tasks;
}
export function duplicateTaskForPeriod(periodStart, periodEnd, task, ecartDay, groupId, taskExpiryDate) {
    if (periodStart >= periodEnd)
        throw new Error("period Start is after period End");
    let allTasks = [];
    for (let dayInMilliseconds = periodStart.getTime(); dayInMilliseconds <= periodEnd.getTime(); dayInMilliseconds += ecartDay
        ? DAY_IN_MILLISECONDS * ecartDay
        : DAY_IN_MILLISECONDS) {
        const { taskStart, taskEnd, taskDate, offset, taskId, groupId: currentTaskGroupId, taskExpiryDate: currentTaskExpiryDate } = task, rest = __rest(task, ["taskStart", "taskEnd", "taskDate", "offset", "taskId", "groupId", "taskExpiryDate"]);
        const newOffset = updateOffsetWithDateCalendar(periodEnd);
        const ecartDay = Math.round((dayInMilliseconds - taskDate.getTime()) / DAY_IN_MILLISECONDS);
        const newTaskStart = taskStart + ecartDay * DAY_IN_MILLISECONDS;
        const newTaskEnd = taskEnd + ecartDay * DAY_IN_MILLISECONDS;
        const newTaskDate = new Date(taskDate.getTime() + ecartDay * DAY_IN_MILLISECONDS);
        if (!checkDuplicates(allTasks, newTaskStart, newTaskEnd, rest.groupId)) {
            const newTask = Object.assign(Object.assign({}, rest), { taskDate: newTaskDate, taskStart: newTaskStart, taskEnd: newTaskEnd, taskId: getUnqueId(), groupId: groupId ? groupId : currentTaskGroupId, taskExpiryDate: taskExpiryDate });
            allTasks.push(Object.assign(Object.assign({}, newTask), { offset: newOffset }));
        }
    }
    return allTasks;
}
export const GetTimeRangeByDay = (start, end) => {
    const hourToMillisecond = 3600000;
    const range = [];
    for (let i = start; i < end; i += hourToMillisecond) {
        range.push(i);
    }
    return range;
};
