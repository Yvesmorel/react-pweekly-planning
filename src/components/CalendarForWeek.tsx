
import {
  CalendarPropsType,
  CalendarTablePropsType,
  TaskFeildsType,
  TasksType,
} from "../definitions";
import { v4 as uuidv4 } from 'uuid';
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
  updateOffsetWithDateCalendar,
} from "../lib/utils";

import TaskContainer from "./TaskContainer";

import AddTask from "./AddTask";
import SumHoursContainer from "./SumHoursContainer";
import { memo, useEffect } from "react";
import useCalendarDateState from "../hooks/useCalendarDateState";
import { useCalendarTask } from "../hooks/useCalendarTask";
import { useCalendarContext } from "../contexts/CalendarContext";
import { useCalendarTaskContext } from "../contexts/CalendarTaskContext";
function CalendarForWeek(props: CalendarTablePropsType) {

  const { getTasks, isValidTask, addTask, deleteTask, updateTask, getTask } = useCalendarTaskContext();




  const tasks = getTasks(`${props.weekOffset || 0}`);

  const { dailyHours, weekDays } = useCalendarDateState(
    props.date,
    props.weekOffset,
    props.timeZone
  );

  const handleDragOver = (event: React.DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
  };



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
          <th
            className={`dayTh ${props.groupsColsClassName}`}
            style={{ ...props.groupsColsStyle }}
          >
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
          <th
            className={`totalTh ${props.hoursColsClassName}`}
            style={props.hoursColsStyle}
          >
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
                style={props.groupContainerStyle}
                className={props.groupContainerClassName}
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
                  if (!tasks) return;
                  const dropInfo = getSessionStorageRecordForDragAndDrop(
                    tasks,
                    positionDay,
                    group.id,
                    getTask
                  );
                  if (!dropInfo) return;
                  const dropOffset = updateOffsetWithDateCalendar(props.date);
                  console.log('ici', dropOffset, dropInfo.newTask.id, dropInfo.newTask);
                  if (props.drop === "copy") {
                    addTask(`${dropOffset}`, { ...dropInfo.newTask, id: uuidv4() })
                    return
                  }
                  updateTask(`${dropOffset}`, dropInfo.newTask.id, dropInfo.newTask)
                  // deleteTask(`${dropOffset}`, dropInfo.newTask.id)


                  // console.log('ici', dropOffset, dropInfo.newTask.id, dropInfo.newTask);

                }}
                id={`td-${group.id}day-i`}
                className={props.dayColsClassName}
                style={props.dayColsStyle}
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
                    {tasks
                      .map((task, taskKey) => {
                        if (

                          task.dayIndex === positionDay &&
                          task.groupId === group.id && isValidTask(task)
                        ) {
                          return (
                            <TaskContainer
                              key={`${task.id} task`}
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
            <td
              key={`${i}sumHours`}
              style={props.hoursColsStyle}
              className={props.hoursColsClassName}
            >
              <SumHoursContainer
                groupId={group.id}
                tasks={tasks}
                weekOffset={props.weekOffset || 0}
                calendarDate={props.date}
                sumHoursRender={props.sumHoursRender}
                sumHoursByGroups={sumHoursByGroups(
                  group.id,
                  tasks,
                  props.weekOffset || 0,
                  props.date,
                  props.timeZone
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

export default CalendarForWeek
