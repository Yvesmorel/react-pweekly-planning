"use client";
import "../style.css";
import { memo, useEffect } from "react";

import { CalendarPropsType, CalendarTablePropsType } from "../definitions";
import { compareWeekOffset, saveTasksToLocalStorage } from "../lib/utils";
import useCalendarDateState from "../hooks/useCalendarDateState";

import AddTask from "./AddTask";
import TaskContainer from "./TaskContainer";
import GroupContainer from "./GroupContainer";
import DayContainer from "./DayContainer";

function CalendarForDay(props: CalendarTablePropsType) {
  const { dailyHours, weekDays } = useCalendarDateState(
    props.date,
    props.weekOffset,
    props.timeZone
  );

  useEffect(() => {
    saveTasksToLocalStorage(props.tasks);
  }, [props.tasks]);

  const currentDay = weekDays[props.dayOffset || 0];
  const currentDailyHours = dailyHours[props.dayOffset || 0];

  return (
    <div
      className={` CalendarTableForDay ${props.className}`}
      style={{ ...props.style }}
    >
      {currentDay && (
        <DayContainer
          style={props.dayStyle}
          className={props.dayClassName}
          dayIndex={props.dayOffset || 0}
          dayRender={props.dayRender}
          day={currentDay.day}
          dayOfTheMonth={currentDay.dayOfTheMonth}
          dayMonth={currentDay.dayMonth}
          dayYear={currentDay.dayYear}
        />
      )}
      <div className={`CalendarTableForDayTasksContainer`}>
        {currentDailyHours &&
          props.groups.map((group, i) => {
            return (
              <div
                key={i}
                style={{
                  width: "100%",
                  height: "auto",
                  background: "#f2f8f8",
                  padding: "5px",
                  borderBottom: "1.5px solid #0f52737e",
                  borderRight: "0.74px solid rgba(198, 219, 225, 0.68)",
                  borderLeft: "0.74px solid rgba(198, 219, 225, 0.68)",
                  ...props.rowsStyle,
                }}
                className={`${props.rowsClassName}`}
              >
                <div
                  style={{
                    width: "auto",
                    height: "auto",
                    ...props.groupsColsStyle,
                  }}
                  className={props.groupsColsClassName}
                >
                  <GroupContainer
                    style={props.groupContainerStyle}
                    className={props.groupContainerClassName}
                    groupRender={props.groupRender}
                    currentGroup={group}
                    handleClickGroup={props.handleClickGroup}
                  />
                </div>

                {props.tasks.map((task, taskKey) => {
                  if (
                    task.dayIndex === (props.dayOffset || 0) &&
                    task.groupId === group.id &&
                    compareWeekOffset(
                      props.date,
                      props.weekOffset || 0,
                      task.taskDate
                    )
                  ) {
                    return (
                      <TaskContainer
                        key={`${taskKey} task`}
                        handleDragTask={props.handleDragTask}
                        taskRender={props.taskRender}
                        handleDragTaskEnd={props.handleDragTaskEnd}
                        style={props.taskContainerStyle}
                        className={`${props.taskContainerClassName}`}
                        currentTask={task}
                        handleClickTask={props.handleClickTask}
                      />
                    );
                  } else return "";
                })}
                <AddTask
                  addTaskStyle={props.addTaskStyle}
                  addTaskClassName={props.addTaskClassName}
                  currentGroup={group}
                  dayInfo={currentDailyHours}
                  addTaskRender={props.addTaskRender}
                  handleAddTask={props.handleAddTask}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default memo(
  CalendarForDay,
  (
    prevProps: Readonly<CalendarPropsType>,
    nextProps: Readonly<CalendarPropsType>
  ) =>
    prevProps.tasks === nextProps.tasks &&
    prevProps.date === nextProps.date &&
    prevProps.groups === nextProps.groups &&
    prevProps.weekOffset === nextProps.weekOffset
);
