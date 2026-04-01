import "./style.css";
import { memo, useRef, useMemo } from "react";

import { CalendarTablePropsType } from "../definitions";
import useCalendarDateState from "../hooks/useCalendarDateState";

import VirtualGroupRowDay from "./VirtualGroupRowDay";
import DayContainer from "./DayContainer";
import { useCalendarTaskContext } from "../contexts/CalendarTaskContext";
import { useContainerScroll } from "../hooks/useContainerScroll";
import useMainContainerContent from "../hooks/useMainContainerItemContent";

function CalendarForDay(props: CalendarTablePropsType) {

  const { dailyHours, weekDays } = useCalendarDateState(
    props.date,
    props.weekOffset,
    props.timeZone,

  );


  const { getTasks, isValidTask, addTask, deleteTask, updateTask, getTask, hashScope, tasks } = useCalendarTaskContext();






  const currentDay = weekDays[props.dayOffset || 0];

  const memoizedHeader = useMemo(() => (
    currentDay ? (
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
    ) : null
  ), [weekDays, props.rowsClassName, props.rowsStyle, props.groupsColsClassName, props.groupsColsStyle, props.groupHeadContainerClassName, props.groupHeadContainerStyle, props.groupsHeadRender, props.daysColsClassName, props.daysColsStyle, props.dayStyle, props.dayClassName, props.dayRender]);

  return (
    <div

      className={`CalendarTableForDay ${props.className}`}
      style={{ position: "relative", ...props.style }}
    >
      {memoizedHeader}
      <div className={`CalendarTableForDayTasksContainer`}>
        {props.groups.map((group, i) => (
          <VirtualGroupRowDay
            key={`${group.id}-${i}`}
            group={group}
            i={i}
            props={props}
            getTasks={getTasks}
            isValidTask={isValidTask}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            getTask={getTask}
            dailyHours={dailyHours}
            dayOffset={props.dayOffset || 0}
            hashScope={hashScope || "day"}


            tasks={tasks}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(CalendarForDay, (prevProps, nextProps) => {
  return (
    prevProps.date?.getTime() === nextProps.date?.getTime() &&
    prevProps.weekOffset === nextProps.weekOffset &&
    prevProps.dayOffset === nextProps.dayOffset &&
    prevProps.groups === nextProps.groups &&
    prevProps.className === nextProps.className
  );
});