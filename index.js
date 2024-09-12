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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./style.css";
import { getWeekDays, getDayHourly, calculerEcartSemaine, getSessionStorageRecordForDragAndDrop, sumHoursByGroups, millisecondsToDate, compareWeekOffset, saveTasksToLocalStorage, } from "./lib/utils";
const theadTrStyle = {
    color: "#0f5173",
    fontWeight: "300",
    position: "sticky",
    top: 0,
};
const groupTdStyle = {
    height: "auto",
    width: "150px",
};
const groupContainerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem", // Correspond à gap-3
    padding: "0.75rem", // Correspond à p-3
    color: "#0f5173",
    cursor: "pointer",
};
/**
 * Calendar component to display tasks and groups in a weekly view.
 *
 * @param {Object} props - The props for the Calendar component.
 * @param {React.CSSProperties} [props.style] - Additional styles for the calendar component.
 * @param {string} [props.className] - Additional class names for the calendar component.
 * @param {Array} props.groups - Array of group data to be displayed in the calendar.
 * @param {number} [props.weekOffset] - Offset for the week (e.g., -1 for last week, 0 for current week, 1 for next week).
 * @param {Date} props.date - The current date to display in the calendar.
 * @param {Function} [props.groupRender] - Custom render function for a group.
 * @param {Function} [props.dayRender] - Custom render function for a day.
 * @param {React.CSSProperties} [props.rowsStyle] - Additional styles for the rows.
 * @param {React.CSSProperties} [props.groupsColsStyle] - Additional styles for the group columns.
 * @param {React.CSSProperties} [props.daysColsStyle] - Additional styles for the day columns.
 * @param {Function} [props.addTaskRender] - Custom render function for the add task button.
 * @param {Function} [props.handleAddTask] - Handler function for adding a new task.
 * @param {string} [props.dayClassName] - Additional class names for the days.
 * @param {React.CSSProperties} [props.dayStyle] - Additional styles for the days.
 * @param {string} [props.groupClassName] - Additional class names for the groups.
 * @param {React.CSSProperties} [props.groupStyle] - Additional styles for the groups.
 * @param {string} [props.addTaskClassName] - Additional class names for the add task button.
 * @param {React.CSSProperties} [props.addTaskStyle] - Additional styles for the add task button.
 * @param {Array} props.tasks - Array of tasks to be displayed in the calendar.
 * @param {Function} [props.handleDragTask] - Handler function for dragging a task.
 * @param {Function} [props.handleDropTask] - Handler function for dropping a task.
 * @param {Function} [props.taskRender] - Custom render function for a task.
 * @param {Function} [props.groupsHeadRender] - Custom render function for the groups header.
 * @param {Function} [props.sumHoursRender] - Custom render function for the sum of hours.
 * @param {Function} [props.sumHoursHeadRender] - Custom render function for the sum of hours header.
 * @param {Function} [props.handleDragTaskEnd] - Handler function for ending the drag of a task.
 * @param {string} [props.rowsClassName] - Additional class names for the rows.
 * @param {string} [props.daysColsClassName] - Additional class names for the day columns.
 * @param {string} [props.sumHoursContainerClassName] - Additional class names for the sum hours container.
 * @param {React.CSSProperties} [props.sumHoursContainerStyle] - Additional styles for the sum hours container.
 * @param {string} [props.groupHeadContainerClassName] - Additional class names for the group head container.
 * @param {React.CSSProperties} [props.groupHeadContainerStyle] - Additional styles for the group head container.
 * @param {string} [props.groupsColsClassName] - Additional class names for the group columns.
 * @param {string} [props.taskContainerClassName] - Additional class names for the task container.
 * @param {React.CSSProperties} [props.taskContainerStyle] - Additional styles for the task container.
 * @param {string} [props.sumHoursHeadClassName] - Additional class names for the sum hours header.
 * @param {React.CSSProperties} [props.sumHoursHeadStyle] - Additional styles for the sum hours header.
 * @param {Function} [props.handleClickGroup] - Handler function for clicking a group.
 * @param {Function} [props.handleClickTask] - Handler function for clicking a task.
 * @returns {JSX.Element} The rendered Calendar component.
 */
const Calendar = ({ style, className, groups, weekOffset, date, groupRender, dayRender, rowsStyle, groupsColsStyle, daysColsStyle, addTaskRender, handleAddTask, dayClassName, dayStyle, groupClassName, groupStyle, addTaskClassName, addTaskStyle, tasks, handleDragTask, handleDropTask, taskRender, groupsHeadRender, sumHoursRender, sumHoursHeadRender, handleDragTaskEnd, rowsClassName, daysColsClassName, sumHoursContainerClassName, sumHoursContainerStyle, groupHeadContainerClassName, groupHeadContainerStyle, groupsColsClassName, taskContainerClassName, taskContainerStyle, sumHoursHeadClassName, sumHoursHeadStyle, handleClickGroup, handleClickTask, }) => {
    const weekOffsetByDate = calculerEcartSemaine(date);
    const weekDays = getWeekDays(weekOffsetByDate || weekOffset || 0);
    const dailyHours = getDayHourly(weekOffsetByDate || weekOffset || 0);
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    saveTasksToLocalStorage(tasks);
    return (_jsxs("table", { className: `planningCalendar ${className}`, style: Object.assign({}, style), children: [_jsx("thead", { children: _jsxs("tr", { className: `${rowsClassName}`, style: Object.assign(Object.assign({}, theadTrStyle), rowsStyle), children: [_jsx("th", { className: "dayTh", children: _jsx(GroupsHeadContainer, { className: `${groupHeadContainerClassName}`, style: groupHeadContainerStyle, groupsHeadRender: groupsHeadRender }) }), weekDays.map((day, i) => (_jsx("th", { className: `${daysColsClassName}`, style: Object.assign({}, daysColsStyle), children: _jsx(DayContainer, { style: dayStyle, className: dayClassName, dayIndex: i, dayRender: dayRender, day: day.day, dayOfTheMonth: day.dayOfTheMonth, dayMonth: day.dayMonth, dayYear: day.dayYear }) }, i))), _jsx("th", { className: "totalTh", children: _jsx(SumHoursHead, { className: sumHoursHeadClassName, style: sumHoursHeadStyle, sumHoursHeadRender: sumHoursHeadRender }) })] }, "") }), _jsx("tbody", { children: groups === null || groups === void 0 ? void 0 : groups.map((group, i) => (_jsxs("tr", { className: `${rowsClassName}`, style: Object.assign({}, rowsStyle), children: [_jsx("td", { className: `${groupsColsClassName}`, style: Object.assign(Object.assign({}, groupTdStyle), groupsColsStyle), children: _jsx(GroupContainer, { style: groupStyle, className: groupClassName, groupRender: groupRender, currentGroup: group, handleClickGroup: handleClickGroup }) }, i), dailyHours.map((_, positionDay) => (_jsx("td", { onDragOver: handleDragOver, onDrop: (event) => {
                                if (!handleDropTask || !tasks)
                                    return;
                                const dropInfo = getSessionStorageRecordForDragAndDrop(tasks, positionDay, group.id);
                                if (!dropInfo)
                                    return;
                                handleDropTask(event, dropInfo.taskDropStart, dropInfo.taskDropEnd, dropInfo.taskDropDate, group.id, positionDay, dropInfo.newTask, dropInfo.newTasks);
                            }, id: `td-${group.id}day-i`, children: _jsxs("div", { style: {
                                    display: "flex",
                                    width: "100%",
                                    height: "100%",
                                    flexDirection: "column",
                                    padding: "5px",
                                }, children: [_jsx(_Fragment, { children: tasks === null || tasks === void 0 ? void 0 : tasks.filter((task) => task.dayIndex === positionDay &&
                                            task.groupId === group.id &&
                                            compareWeekOffset(date, weekOffset || 0, task.taskDate)).sort((a, b) => a.taskStart - b.taskStart).map((task, taskKey) => {
                                            return (_jsx(TaskContainer, { handleDragTask: handleDragTask, taskRender: taskRender, handleDragTaskEnd: handleDragTaskEnd, style: taskContainerStyle, className: `${taskContainerClassName}`, currentTask: task, handleClickTask: handleClickTask }, `${taskKey} task`));
                                        }) }), _jsx(AddTask, { addTaskStyle: addTaskStyle, addTaskClassName: addTaskClassName, currentGroup: group, dayInfo: dailyHours[positionDay], addTaskRender: addTaskRender, handleAddTask: handleAddTask })] }, positionDay) }, `td-${group.id}day-i${positionDay}`))), _jsx("td", { children: _jsx(SumHoursContainer, { groupId: group.id, tasks: tasks, weekOffset: weekOffset || 0, calendarDate: date, sumHoursRender: sumHoursRender, sumHoursByGroups: sumHoursByGroups(group.id, tasks, weekOffset || 0, date), className: sumHoursContainerClassName, style: sumHoursContainerStyle }) }, `${i}sumHours`)] }, `${i} tr`))) })] }));
};
const SumHoursHead = ({ sumHoursHeadRender, className, style, }) => {
    if (sumHoursHeadRender) {
        return _jsx(_Fragment, { children: sumHoursHeadRender() });
    }
    return (_jsx("div", { className: `${className}`, style: Object.assign({ textAlign: "right", marginRight: "5px" }, style), children: "Hours" }));
};
const SumHoursContainer = ({ groupId, tasks, weekOffset, calendarDate, sumHoursByGroups, sumHoursRender, className, style, }) => {
    if (sumHoursRender) {
        return (_jsx(_Fragment, { children: sumHoursRender({
                groupId,
                tasks,
                weekOffset,
                calendarDate,
                sumHoursByGroups,
            }) }));
    }
    return (_jsx("div", { style: Object.assign({ textAlign: "right", marginRight: "5px" }, style), className: `${className}`, children: sumHoursByGroups }));
};
const DayContainer = ({ dayIndex, dayOfTheMonth, day, dayMonth, dayYear, dayRender, className, style, }) => {
    if (dayRender) {
        return (_jsx(_Fragment, { children: dayRender({
                dayIndex,
                day,
                dayOfTheMonth,
                dayMonth,
                dayYear,
            }) }));
    }
    return (_jsx("div", { className: `${className}`, style: style, children: `${day}. ${dayOfTheMonth}` }));
};
const GroupContainer = ({ className, style, groupRender, currentGroup, handleClickGroup, }) => {
    if (groupRender) {
        return _jsx(_Fragment, { children: groupRender({ currentGroup }) });
    }
    const handleClick = () => {
        if (!handleClickGroup)
            return;
        handleClickGroup(currentGroup);
    };
    return (_jsxs("div", { onClick: handleClick, className: `${className}`, style: Object.assign(Object.assign({}, groupContainerStyle), style), children: [currentGroup.imageUrl && (_jsx("img", { width: 30, height: 30, src: currentGroup.imageUrl, alt: "groupimg" })), _jsx("label", { children: currentGroup.label && currentGroup.label })] }));
};
const AddTask = ({ currentGroup, handleAddTask, addTaskRender, dayInfo, addTaskStyle, addTaskClassName, }) => {
    if (addTaskRender) {
        return (_jsx(_Fragment, { children: addTaskRender({
                currentGroup,
                dayInfo,
            }) }));
    }
    const handleClick = () => {
        if (!handleAddTask)
            return;
        handleAddTask(currentGroup, dayInfo);
    };
    return (_jsx("div", { onClick: handleClick, style: addTaskStyle, className: `addPlanStyle ${addTaskClassName}`, children: "+" }));
};
const TaskContainer = ({ handleDragTask, taskRender, handleDragTaskEnd, style, className, currentTask, handleClickTask, }) => {
    const handleDragStart = (event) => {
        if (!handleDragTask)
            return;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", currentTask.taskId);
        window.sessionStorage.setItem("calendardragtaskId", currentTask.taskId);
        window.sessionStorage.setItem("calendardragtaskStart", `${currentTask.taskStart}`);
        window.sessionStorage.setItem("calendardragtaskEnd", `${currentTask.taskEnd}`);
        window.sessionStorage.setItem("calendardragdayIndex", `${currentTask.dayIndex}`);
        handleDragTask(event, currentTask);
    };
    const handleDragEnd = (event) => {
        if (!handleDragTaskEnd)
            return;
        handleDragTaskEnd(event);
    };
    const handleClick = () => {
        if (!handleClickTask)
            return;
        handleClickTask(currentTask);
    };
    if (taskRender) {
        return (_jsx("div", { onClick: handleClick, id: currentTask.taskId, className: `taskContainer ${className}`, style: Object.assign({}, style), draggable: true, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: taskRender({
                currentTask,
            }) }));
    }
    return (_jsxs("div", { onClick: handleClick, id: currentTask.taskId, className: `taskContainer  ${className}`, style: Object.assign({}, style), draggable: true, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: [_jsx("p", { className: "tasklabel", children: currentTask.task && currentTask.task }), _jsx("p", { className: "taskhour", children: currentTask.taskStart &&
                    currentTask.taskEnd &&
                    `${millisecondsToDate(currentTask.taskStart).formattedDate} - ${millisecondsToDate(currentTask.taskEnd).formattedDate}` })] }));
};
const GroupsHeadContainer = ({ groupsHeadRender, style, className, }) => {
    if (groupsHeadRender) {
        return _jsx(_Fragment, { children: groupsHeadRender() });
    }
    return (_jsx("div", { className: `${className}`, style: style, children: "WeeklyCalendar" }));
};
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
export default Calendar;
