import React, { memo, useRef, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import GroupContainer from "./GroupContainer";
import TaskVirtual from "./TaskContainer/TaskVirtual";
import AddTask from "./AddTask";
import {
  getHash,
  getNewTaskForDropOrPaste,
  getUniqueId,
  updateOffsetWithDateCalendarForWeek,
} from "../lib/utils";
import { groupTdStyle } from "../lib/slyles";
import { CalendarTablePropsType, GroupFeildsType, TaskType, TasksStore, TasksType, dayInfoType } from "../definitions";
import SumHoursContainer from "./SumHoursContainer";


interface VirtualGroupRowProps {
  group: GroupFeildsType;
  i: number;
  props: CalendarTablePropsType;
  getTasks: (hash: string) => TasksType;
  isValidTask: (task: TaskType) => boolean;
  addTask: (task: TaskType) => void;
  deleteTask: (hash: string, taskId: string) => void;
  getTask: (hash: string, taskId: string) => TaskType | undefined;
  dailyHours: dayInfoType[];
  hashScope: "week" | "group" | "day";

  tasks: TasksStore; // The tasks store to trigger re-renders
  sumHoursByGroupsCount: number;


}

const VirtualGroupRow: React.FC<VirtualGroupRowProps> = ({
  group,
  i,
  props,
  getTasks,
  isValidTask,
  addTask,
  deleteTask,
  getTask,
  dailyHours,
  hashScope,
  tasks,

}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { entry, height } = useIntersectionObserver(ref, {
    rootMargin: "600px",
    threshold: 0,

  });

  const isVisible = !!entry?.isIntersecting;
  const offset = useMemo(() => updateOffsetWithDateCalendarForWeek(props.date), [props.date]);

  const cellData = useMemo(() => {
    if (!isVisible) return [];
    return dailyHours.map((_, positionDay) => {
      const hash = getHash(offset, group.id, positionDay);
      const cellTasks = getTasks(hash[hashScope]);

      return {
        hash: hash[hashScope],
        tasks: cellTasks,
        positionDay
      };
    });
  }, [isVisible, offset, group.id, dailyHours, hashScope, getTasks, isValidTask, tasks]);

  return (
    <div
      ref={ref}
      className={`planningCalendarRow ${props.rowsClassName}`}
      style={{
        ...props.rowsStyle,
        minHeight: isVisible ? "auto" : `${height}px`,
      }}
      data-index={i}
    >
      {isVisible ? (
        <>
          <div
            className={`groupCol ${props.groupsColsClassName}`}
            style={{ ...groupTdStyle, ...props.groupsColsStyle }}
            key={group.id}
          >
            <GroupContainer
              style={props.groupContainerStyle}
              className={props.groupContainerClassName}
              groupRender={props.groupRender}
              currentGroup={group}
              handleClickGroup={props.handleClickGroup}
            />
          </div>
          {cellData.map((cell: { tasks: TasksType; positionDay: number; hash: string }) => {


            return (
              <div
                key={`col-${group.id}day-i${cell.positionDay}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(event) => {
                  const dropInfo = getNewTaskForDropOrPaste(
                    cell.positionDay,
                    group.id,
                    getTask,
                    cell.hash
                  );
                  if (!dropInfo) return;
                  if (props.drop === "copy") {
                    addTask({ ...dropInfo.newTask, id: uuidv4() });
                    return;
                  }
                  deleteTask(dropInfo.newTask.draghash, dropInfo.newTask.id);
                  addTask({ ...dropInfo.newTask, id: getUniqueId() });
                }}
                id={`col-${group.id}day-i`}
                className={`dayCol ${props.dayColsClassName}`}
                style={props.dayColsStyle}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    padding: "5px",
                  }}
                >



                  {cell.tasks.map((task: TaskType, index: number) => {
                    if (task.dayIndex === cell.positionDay &&
                      task.groupId === group.id && isValidTask(task)) {
                      return (
                        <TaskVirtual
                          key={`${task.id} task`}
                          index={index}
                          handleDragTask={props.handleDragTask}
                          taskRender={props.taskRender}
                          handleDragTaskEnd={props.handleDragTaskEnd}
                          style={props.taskContainerStyle}
                          className={`${props.taskContainerClassName}`}
                          currentTask={task}
                          handleClickTask={props.handleClickTask}
                        />
                      )
                    } else return null;
                  })}

                  <AddTask
                    addTaskStyle={props.addTaskStyle}
                    addTaskClassName={props.addTaskClassName}
                    currentGroup={group}
                    dayInfo={dailyHours[cell.positionDay]}
                    addTaskRender={props.addTaskRender}
                    handleAddTask={props.handleAddTask}
                  />
                </div>
              </div>
            );
          })}
          {/* <div
            className={`totalCol ${props.hoursColsClassName}`}
            style={props.hoursColsStyle}
            key={`${i}sumHours`}
          >
            <SumHoursContainer
              groupId={group.id}
              weekOffset={props.weekOffset || 0}
              calendarDate={props.date}
              sumHoursRender={props.sumHoursRender}
              sumHoursByGroups={sumHoursByGroupsCount}
              className={props.sumHoursContainerClassName}
              style={props.sumHoursContainerStyle}
            />
          </div> */}
        </>
      ) : (
        <div style={{ height: `${height}px`, width: "100%" }} />
      )}
    </div>
  );
};

export default memo(VirtualGroupRow, (prev, next) => {

  return (
    prev.group.id === next.group.id &&
    prev.i === next.i &&
    prev.tasks === next.tasks &&
    prev.props.date.getTime() === next.props.date.getTime() &&
    prev.sumHoursByGroupsCount === next.sumHoursByGroupsCount
  );
});
