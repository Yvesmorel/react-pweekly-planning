"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import GroupContainer from "./GroupContainer";
import GroupsHeadContainer from "./GroupsHeadContainer";
import { groupTdStyle, theadTrStyle } from "../lib/slyles";
import DayContainer from "./DayContainer";
import SumHoursHead from "./SumHoursHead";
import { compareWeekOffset, getSessionStorageRecordForDragAndDrop, saveTasksToLocalStorage, sumHoursByGroups, } from "../lib/utils";
import TaskContainer from "./TaskContainer";
import AddTask from "./AddTask";
import SumHoursContainer from "./SumHoursContainer";
import { memo, useEffect } from "react";
import useCalendarDateState from "../hooks/useCalendarDateState";
function CalendarForWeek(props) {
    var _a;
    const { dailyHours, weekDays } = useCalendarDateState(props.date, props.weekOffset, props.timeZone);
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        saveTasksToLocalStorage(props.tasks);
    }, [props.tasks]);
    return (_jsxs("table", { className: `planningCalendar ${props.className}`, style: Object.assign({}, props.style), children: [_jsx("thead", { children: _jsxs("tr", { className: `${props.rowsClassName}`, style: Object.assign(Object.assign({}, theadTrStyle), props.rowsStyle), children: [_jsx("th", { className: `dayTh ${props.groupsColsClassName}`, style: Object.assign({}, props.groupsColsStyle), children: _jsx(GroupsHeadContainer, { className: `${props.groupHeadContainerClassName}`, style: props.groupHeadContainerStyle, groupsHeadRender: props.groupsHeadRender }) }), weekDays.map((day, i) => (_jsx("th", { className: `${props.daysColsClassName}`, style: Object.assign({}, props.daysColsStyle), children: _jsx(DayContainer, { style: props.dayStyle, className: props.dayClassName, dayIndex: i, dayRender: props.dayRender, day: day.day, dayOfTheMonth: day.dayOfTheMonth, dayMonth: day.dayMonth, dayYear: day.dayYear }) }, i))), _jsx("th", { className: `totalTh ${props.hoursColsClassName}`, style: props.hoursColsStyle, children: _jsx(SumHoursHead, { className: props.sumHoursHeadClassName, style: props.sumHoursHeadStyle, sumHoursHeadRender: props.sumHoursHeadRender }) })] }, "") }), _jsx("tbody", { children: (_a = props.groups) === null || _a === void 0 ? void 0 : _a.map((group, i) => (_jsxs("tr", { className: `${props.rowsClassName}`, style: Object.assign({}, props.rowsStyle), children: [_jsx("td", { className: `${props.groupsColsClassName}`, style: Object.assign(Object.assign({}, groupTdStyle), props.groupsColsStyle), children: _jsx(GroupContainer, { style: props.groupContainerStyle, className: props.groupContainerClassName, groupRender: props.groupRender, currentGroup: group, handleClickGroup: props.handleClickGroup }) }, i), dailyHours.map((_, positionDay) => (_jsx("td", { onDragOver: handleDragOver, onDrop: (event) => {
                                if (!props.handleDropTask || !props.tasks)
                                    return;
                                const dropInfo = getSessionStorageRecordForDragAndDrop(props.tasks, positionDay, group.id);
                                if (!dropInfo)
                                    return;
                                props.handleDropTask(event, dropInfo.taskDropStart, dropInfo.taskDropEnd, dropInfo.taskDropDate, group.id, positionDay, dropInfo.newTask, dropInfo.newTasks);
                            }, id: `td-${group.id}day-i`, className: props.dayColsClassName, style: props.dayColsStyle, children: _jsxs("div", { style: {
                                    display: "flex",
                                    width: "100%",
                                    height: "100%",
                                    flexDirection: "column",
                                    padding: "5px",
                                }, children: [_jsx(_Fragment, { children: props.tasks
                                            .map((task, taskKey) => {
                                            if (task.dayIndex === positionDay &&
                                                task.groupId === group.id &&
                                                compareWeekOffset(props.date, props.weekOffset || 0, task.taskDate)) {
                                                return (_jsx(TaskContainer, { handleDragTask: props.handleDragTask, taskRender: props.taskRender, handleDragTaskEnd: props.handleDragTaskEnd, style: props.taskContainerStyle, className: `${props.taskContainerClassName}`, currentTask: task, handleClickTask: props.handleClickTask }, `${taskKey} task`));
                                            }
                                            else
                                                return "";
                                        }) }), _jsx(AddTask, { addTaskStyle: props.addTaskStyle, addTaskClassName: props.addTaskClassName, currentGroup: group, dayInfo: dailyHours[positionDay], addTaskRender: props.addTaskRender, handleAddTask: props.handleAddTask })] }, positionDay) }, `td-${group.id}day-i${positionDay}`))), _jsx("td", { style: props.hoursColsStyle, className: props.hoursColsClassName, children: _jsx(SumHoursContainer, { groupId: group.id, tasks: props.tasks, weekOffset: props.weekOffset || 0, calendarDate: props.date, sumHoursRender: props.sumHoursRender, sumHoursByGroups: sumHoursByGroups(group.id, props.tasks, props.weekOffset || 0, props.date), className: props.sumHoursContainerClassName, style: props.sumHoursContainerStyle }) }, `${i}sumHours`)] }, `${i} tr`))) })] }));
}
export default memo(CalendarForWeek, (prevProps, nextProps) => prevProps.tasks === nextProps.tasks &&
    prevProps.date === nextProps.date &&
    prevProps.groups === nextProps.groups &&
    prevProps.weekOffset === nextProps.weekOffset);
