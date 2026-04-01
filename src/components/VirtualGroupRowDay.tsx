import React, { memo, useRef, useMemo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import GroupContainer from "./GroupContainer";
import TaskVirtual from "./TaskContainer/TaskVirtual";
import AddTask from "./AddTask";
import {
  getHash,
  getNewTaskForDropOrPaste,
  getUniqueId,
} from "../lib/utils";
import { CalendarTablePropsType, GroupFeildsType, TaskType, TasksStore, TasksType, dayInfoType } from "../definitions";

interface VirtualGroupRowDayProps {
  group: GroupFeildsType;
  i: number;
  props: CalendarTablePropsType;
  getTasks: (hash: string) => TasksType;
  isValidTask: (task: TaskType) => boolean;
  addTask: (task: TaskType) => void;
  deleteTask: (hash: string, taskId: string) => void;
  updateTask: (hash: string, taskId: string, updatedTask: Partial<TaskType>) => void;
  getTask: (hash: string, taskId: string) => TaskType | undefined;
  dailyHours: dayInfoType[];
  dayOffset: number;
  weekOffset: number;
  hashScope: "week" | "group" | "day";
  tasks: TasksStore;
}

const VirtualGroupRowDay: React.FC<VirtualGroupRowDayProps> = ({
  group,
  i,
  props,
  getTasks,
  isValidTask,
  addTask,
  deleteTask,
  updateTask,
  getTask,
  dailyHours,
  dayOffset,
  weekOffset,
  hashScope,
  tasks,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { entry, height } = useIntersectionObserver(ref, {
    rootMargin: "600px",
    threshold: 0,
  });

  const isVisible = !!entry?.isIntersecting;

  const currentDailyHours = dailyHours[dayOffset];

  const hash = useMemo(() => getHash(weekOffset, group.id, dayOffset), [weekOffset, group.id, dayOffset]);
  const cellTasks = useMemo(() => getTasks(hash[hashScope]), [getTasks, hash, hashScope, tasks]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "auto",
        padding: "5px",
        borderBottom: "1.5px solid #0f52737e",
        borderRight: "0.74px solid rgba(198, 219, 225, 0.68)",
        borderLeft: "0.74px solid rgba(198, 219, 225, 0.68)",
        minHeight: isVisible ? "auto" : `${height}px`,
        ...props.rowsStyle,
      }}
      className={`CalendarTableForDayRow ${props.rowsClassName}`}
    >
      {isVisible ? (
        <>
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
          <div
            className="CalendarTableForDayGroupTasks"
            onDragOver={handleDragOver}
            onDrop={(event) => {
              if (!cellTasks) return;
              const dropInfo = getNewTaskForDropOrPaste(
                currentDailyHours.positionDay,
                group.id,
                getTask,
                hash[hashScope]
              );
              if (!dropInfo) return;
              if (props.drop === "copy") {
                addTask({ ...dropInfo.newTask, id: getUniqueId() });
                return;
              }
              updateTask(hash[hashScope], dropInfo.newTask.id, dropInfo.newTask);
            }}
          >
            {cellTasks.map((task: TaskType, index: number) => {
              if (
                task.dayIndex === dayOffset &&
                task.groupId === group.id &&
                isValidTask(task)
              ) {
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
                );
              } else return null;
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
        </>
      ) : (
        <div style={{ height: `${height}px`, width: "100%" }} />
      )}
    </div>
  );
};

export default memo(VirtualGroupRowDay, (prev, next) => {
  return (
    prev.group.id === next.group.id &&
    prev.i === next.i &&
    prev.tasks === next.tasks &&
    prev.props.date.getTime() === next.props.date.getTime() &&
    prev.dayOffset === next.dayOffset &&
    prev.weekOffset === next.weekOffset
  );
});
