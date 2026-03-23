
import "./style.css";
import { memo, useEffect } from "react";

import { CalendarPropsType, CalendarTablePropsType, TasksType } from "../definitions";
import { compareWeekOffset, getSessionStorageRecordForDragAndDrop, getUnqueId, saveTasksToLocalStorage, updateOffsetWithDateCalendar } from "../lib/utils";
import useCalendarDateState from "../hooks/useCalendarDateState";

import AddTask from "./AddTask";
import TaskContainer from "./TaskContainer";
import GroupContainer from "./GroupContainer";
import DayContainer from "./DayContainer";
import { useCalendarTask } from "../hooks/useCalendarTask";
import { useCalendarTaskContext } from "../contexts/CalendarTaskContext";

function CalendarForDay(props: CalendarTablePropsType) {
  const handleDragOver = (event: React.DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
  };
  const { dailyHours, weekDays } = useCalendarDateState(
    props.date,
    props.weekOffset,
    props.timeZone
  );


  const { getTasks, isValidTask, addTask, deleteTask, updateTask, getTask } = useCalendarTaskContext();
  const tasks = getTasks(`${props.weekOffset || 0}`);

  // useEffect(() => {
  //   saveTasksToLocalStorage(props.tasks);
  // }, [props.tasks]);

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
                  padding: "5px",
                  borderBottom: "1.5px solid #0f52737e",
                  borderRight: "0.74px solid rgba(198, 219, 225, 0.68)",
                  borderLeft: "0.74px solid rgba(198, 219, 225, 0.68)",
                  ...props.rowsStyle,
                }}
                className={`CalendarTableForDayRow ${props.rowsClassName}`}
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
                <div className="CalendarTableForDayGroupTasks" onDragOver={handleDragOver}
                  onDrop={(event) => {
                    if (!tasks) return;
                    const dropInfo = getSessionStorageRecordForDragAndDrop(
                      tasks,
                      currentDailyHours.positionDay,
                      group.id,
                      getTask
                    );
                    if (!dropInfo) return;
                    const dropOffset = updateOffsetWithDateCalendar(props.date);
                    console.log('ici', dropOffset, dropInfo.newTask.id, dropInfo.newTask);
                    if (props.drop === "copy") {
                      addTask(`${dropOffset}`, { ...dropInfo.newTask, id: getUnqueId() })
                      return
                    }
                    updateTask(`${dropOffset}`, dropInfo.newTask.id, dropInfo.newTask)
                    // deleteTask(`${dropOffset}`, dropInfo.newTask.id)


                    // console.log('ici', dropOffset, dropInfo.newTask.id, dropInfo.newTask);

                  }}>
                  {tasks.map((task, taskKey) => {
                    if (
                      task.dayIndex === (props.dayOffset || 0) &&
                      task.groupId === group.id
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
                  <AddTask
                    addTaskStyle={props.addTaskStyle}
                    addTaskClassName={props.addTaskClassName}
                    currentGroup={group}
                    dayInfo={currentDailyHours}
                    addTaskRender={props.addTaskRender}
                    handleAddTask={props.handleAddTask}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default
  CalendarForDay
