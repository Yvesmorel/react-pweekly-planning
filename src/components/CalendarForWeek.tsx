import { CalendarTablePropsType } from "../definitions";
import GroupsHeadContainer from "./GroupsHeadContainer";
import { theadTrStyle } from "../lib/slyles";
import DayContainer from "./DayContainer";
import {
  getHash,
  getUnqueId,
  updateOffsetWithDateCalendar,
} from "../lib/utils";
import { memo, useRef, useMemo } from "react";
import useCalendarDateState from "../hooks/useCalendarDateState";
import { useCalendarTaskContext } from "../contexts/CalendarTaskContext";
import { useContainerScroll } from "../hooks/useContainerScroll";
import useMainContainerContent from "../hooks/useMainContainerItemContent";
import VirtualGroupRow from "./VirtualGroupRow";

const CalendarForWeek = (props: CalendarTablePropsType) => {

  const { getTasks, isValidTask, addTask, deleteTask, getTask, hashScope, tasks } = useCalendarTaskContext();



  const { dailyHours, weekDays } = useCalendarDateState(
    props.date,
    props.weekOffset,
    props.timeZone
  );

  const memoizedHeader = useMemo(() => (
    <div className="planningCalendarHeader">
      <div
        className={`planningCalendarRow ${props.rowsClassName}`}
        style={{ ...theadTrStyle, ...props.rowsStyle }}
        key="header"
      >
        <div
          className={`dayTh ${props.groupsColsClassName}`}
          style={{ ...props.groupsColsStyle }}
        >
          <GroupsHeadContainer
            className={`${props.groupHeadContainerClassName}`}
            style={props.groupHeadContainerStyle}
            groupsHeadRender={props.groupsHeadRender}
          />
        </div>
        {weekDays.map((day, i) => (
          <div
            key={i}
            className={`dayCol ${props.daysColsClassName}`}
            style={{ ...props.daysColsStyle }}
          >
            <DayContainer
              style={props.dayStyle}
              className={props.dayClassName}
              dayIndex={i}
              dayRender={props.dayRender}
              day={day.day}
              dayOfTheMonth={day.dayOfTheMonth}
              dayMonth={day.dayMonth}
              dayYear={day.dayYear}
            />
          </div>
        ))}
      </div>
    </div>
  ), [weekDays, props.rowsClassName, props.rowsStyle, props.groupsColsClassName, props.groupsColsStyle, props.groupHeadContainerClassName, props.groupHeadContainerStyle, props.groupsHeadRender, props.daysColsClassName, props.daysColsStyle, props.dayStyle, props.dayClassName, props.dayRender]);

  const offset = useMemo(() => updateOffsetWithDateCalendar(props.date), [props.date]);

  return (
    <div className="calendarForWeek" style={{ position: "relative" }}>
      <div
        className={`planningCalendar ${props.className}`}
        style={{ ...props.style }}
      >
        {memoizedHeader}
        <div className="planningCalendarBody">
          {props.groups?.map((group, i) => {

            const scope = hashScope || "week";
            const groupHash = getHash(offset, group.id);
            const sumHoursByGroupsCount = tasks.buckets[groupHash[scope]]?.sumOfTaskDuration || 0;

            return (
              <VirtualGroupRow
                key={`${group.id}-${i}`}
                group={group}
                i={i}
                props={props}
                getTasks={getTasks}
                isValidTask={isValidTask}
                addTask={addTask}
                deleteTask={deleteTask}
                getTask={getTask}
                dailyHours={dailyHours}
                hashScope={scope}
                tasks={tasks}
                sumHoursByGroupsCount={sumHoursByGroupsCount}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(CalendarForWeek, (prevProps, nextProps) => {

  return (
    prevProps.date?.getTime() === nextProps.date?.getTime() &&
    prevProps.weekOffset === nextProps.weekOffset &&
    prevProps.groups === nextProps.groups &&
    prevProps.className === nextProps.className
  );
});
