"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../style.css";
import { memo, useEffect } from "react";
import { compareWeekOffset, saveTasksToLocalStorage } from "../lib/utils";
import useCalendarDateState from "../hooks/useCalendarDateState";
import AddTask from "./AddTask";
import TaskContainer from "./TaskContainer";
import GroupContainer from "./GroupContainer";
import DayContainer from "./DayContainer";
function CalendarForDay(props) {
    const { dailyHours, weekDays } = useCalendarDateState(props.date, props.weekOffset, props.timeZone);
    useEffect(() => {
        saveTasksToLocalStorage(props.tasks);
    }, [props.tasks]);
    const currentDay = weekDays[props.dayOffset || 0];
    const currentDailyHours = dailyHours[props.dayOffset || 0];
    return (_jsxs("div", { className: ` CalendarTableForDay ${props.className}`, style: Object.assign({}, props.style), children: [currentDay && (_jsx(DayContainer, { style: props.dayStyle, className: props.dayClassName, dayIndex: props.dayOffset || 0, dayRender: props.dayRender, day: currentDay.day, dayOfTheMonth: currentDay.dayOfTheMonth, dayMonth: currentDay.dayMonth, dayYear: currentDay.dayYear })), _jsx("div", { className: `CalendarTableForDayTasksContainer`, children: currentDailyHours &&
                    props.groups.map((group, i) => {
                        return (_jsxs("div", { style: Object.assign({ width: "100%", height: "auto", background: "#f2f8f8", padding: "5px", borderBottom: "1.5px solid #0f52737e", borderRight: "0.74px solid rgba(198, 219, 225, 0.68)", borderLeft: "0.74px solid rgba(198, 219, 225, 0.68)" }, props.rowsStyle), className: `${props.rowsClassName}`, children: [_jsx("div", { style: Object.assign({ width: "auto", height: "auto" }, props.groupsColsStyle), className: props.groupsColsClassName, children: _jsx(GroupContainer, { style: props.groupContainerStyle, className: props.groupContainerClassName, groupRender: props.groupRender, currentGroup: group, handleClickGroup: props.handleClickGroup }) }), props.tasks
                                    // ?.filter(
                                    //   (task) =>
                                    // )
                                    // .sort((a, b) => a.taskStart - b.taskStart)
                                    .map((task, taskKey) => {
                                    if (task.dayIndex === (props.dayOffset || 0) &&
                                        task.groupId === group.id &&
                                        compareWeekOffset(props.date, props.weekOffset || 0, task.taskDate)) {
                                        return (_jsx(TaskContainer, { handleDragTask: props.handleDragTask, taskRender: props.taskRender, handleDragTaskEnd: props.handleDragTaskEnd, style: props.taskContainerStyle, className: `${props.taskContainerClassName}`, currentTask: task, handleClickTask: props.handleClickTask }, `${taskKey} task`));
                                    }
                                    else
                                        return "";
                                }), _jsx(AddTask, { addTaskStyle: props.addTaskStyle, addTaskClassName: props.addTaskClassName, currentGroup: group, dayInfo: currentDailyHours, addTaskRender: props.addTaskRender, handleAddTask: props.handleAddTask })] }, i));
                    }) })] }));
}
export default memo(CalendarForDay, (prevProps, nextProps) => prevProps.tasks === nextProps.tasks &&
    prevProps.date === nextProps.date &&
    prevProps.groups === nextProps.groups &&
    prevProps.weekOffset === nextProps.weekOffset);
