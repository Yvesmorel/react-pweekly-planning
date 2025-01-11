"use client"

import { CalendarPropsType, CalendarTablePropsType } from "../definitions";
import GroupContainer from "./GroupContainer";
import GroupsHeadContainer from "./GroupsHeadContainer";

import { groupTdStyle, theadTrStyle } from "../lib/slyles";
import DayContainer from "./DayContainer";
import SumHoursHead from "./SumHoursHead";

import {
  compareWeekOffset,
  getSessionStorageRecordForDragAndDrop,
  saveTasksToLocalStorage,
  sumHoursByGroups,
} from "../lib/utils";

import TaskContainer from "./TaskContainer";
import AddTask from "./AddTask";
import SumHoursContainer from "./SumHoursContainer";
import { memo, useCallback, useEffect } from "react";
import useCalendarDateState from "../hooks/useCalendarDateState";

function CalendarTable(props: CalendarTablePropsType) {

  const { dailyHours, weekDays } = useCalendarDateState(
    props.date,
    props.weekOffset
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLTableDataCellElement>) => {
      event.preventDefault();
    },
    []
  );

  useEffect(() => {
    saveTasksToLocalStorage(props.tasks);
  }, [props.tasks]);

  return (
    <table
      className={`planningCalendar ${props.className}`}
      style={{ ...props.style }}
    >
      <thead>
        <tr
          className={`${props.rowsClassName}`}
          style={{ ...theadTrStyle, ...props.rowsStyle }}
          key=""
        >
          <th className="dayTh">
            <GroupsHeadContainer
              className={`${props.groupHeadContainerClassName}`}
              style={props.groupHeadContainerStyle}
              groupsHeadRender={props.groupsHeadRender}
            />
          </th>
          {weekDays.map((day, i) => (
            <th
              key={i}
              className={`${props.daysColsClassName}`}
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
            </th>
          ))}
          <th className="totalTh">
            <SumHoursHead
              className={props.sumHoursHeadClassName}
              style={props.sumHoursHeadStyle}
              sumHoursHeadRender={props.sumHoursHeadRender}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {props.groups?.map((group, i) => (
          <tr
            key={`${i} tr`}
            className={`${props.rowsClassName}`}
            style={{ ...props.rowsStyle }}
          >
            <td
              className={`${props.groupsColsClassName}`}
              key={i}
              style={{ ...groupTdStyle, ...props.groupsColsStyle }}
            >
              <GroupContainer
                style={props.groupStyle}
                className={props.groupClassName}
                groupRender={props.groupRender}
                currentGroup={group}
                handleClickGroup={props.handleClickGroup}
              />
            </td>
            {dailyHours.map((_, positionDay) => (
              <td
                key={`td-${group.id}day-i${positionDay}`}
                onDragOver={handleDragOver}
                onDrop={(event) => {
                  if (!props.handleDropTask || !props.tasks) return;
                  const dropInfo = getSessionStorageRecordForDragAndDrop(
                    props.tasks,
                    positionDay,
                    group.id
                  );
                  if (!dropInfo) return;
                  props.handleDropTask(
                    event,
                    dropInfo.taskDropStart,
                    dropInfo.taskDropEnd,
                    dropInfo.taskDropDate,
                    group.id,
                    positionDay,
                    dropInfo.newTask,
                    dropInfo.newTasks
                  );
                }}
                id={`td-${group.id}day-i`}
              >
                <div
                  key={positionDay}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    padding: "5px",
                  }}
                >
                  <>
                    {props.tasks
                      ?.filter(
                        (task) =>
                          task.dayIndex === positionDay &&
                          task.groupId === group.id &&
                          compareWeekOffset(
                            props.date,
                            props.weekOffset || 0,
                            task.taskDate
                          )
                      )
                      .sort((a, b) => a.taskStart - b.taskStart)
                      .map((task, taskKey) => {
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
                      })}
                  </>

                  <AddTask
                    addTaskStyle={props.addTaskStyle}
                    addTaskClassName={props.addTaskClassName}
                    currentGroup={group}
                    dayInfo={dailyHours[positionDay]}
                    addTaskRender={props.addTaskRender}
                    handleAddTask={props.handleAddTask}
                  />
                </div>
              </td>
            ))}
            <td key={`${i}sumHours`}>
              <SumHoursContainer
                groupId={group.id}
                tasks={props.tasks}
                weekOffset={props.weekOffset || 0}
                calendarDate={props.date}
                sumHoursRender={props.sumHoursRender}
                sumHoursByGroups={sumHoursByGroups(
                  group.id,
                  props.tasks,
                  props.weekOffset || 0,
                  props.date
                )}
                className={props.sumHoursContainerClassName}
                style={props.sumHoursContainerStyle}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default memo(

  CalendarTable,
  (
    prevProps: Readonly<CalendarPropsType>,
    nextProps: Readonly<CalendarPropsType>
  ) =>

    prevProps.tasks === nextProps.tasks &&
    prevProps.date === nextProps.date &&
    prevProps.groups === nextProps.groups &&
    prevProps.weekOffset === nextProps.weekOffset

);
