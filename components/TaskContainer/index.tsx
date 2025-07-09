import { memo } from "react";
import { TaskContainerPropsType } from "../../definitions";
import { millisecondsToDate } from "../../lib/utils";

const TaskContainer = ({
  handleDragTask,
  taskRender,
  handleDragTaskEnd,
  style,
  className,
  currentTask,
  handleClickTask,
}: TaskContainerPropsType) => {
  
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (!handleDragTask) return;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", currentTask.taskId);
    window.sessionStorage.setItem("calendardragtaskId", currentTask.taskId);
    window.sessionStorage.setItem(
      "calendardragtaskStart",
      `${currentTask.taskStart}`
    );
    window.sessionStorage.setItem(
      "calendardragtaskEnd",
      `${currentTask.taskEnd}`
    );
    window.sessionStorage.setItem(
      "calendardragdayIndex",
      `${currentTask.dayIndex}`
    );
    handleDragTask(event, currentTask);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    if (!handleDragTaskEnd) return;
    handleDragTaskEnd(event);
  };

  const handleClick = () => {
    if (!handleClickTask) return;
    handleClickTask(currentTask);
  };

  if (taskRender) {
    return (
      <div
        onClick={handleClick}
        id={currentTask.taskId}
        className={`taskContainer ${className}`}
        style={{ ...style }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {taskRender({
          currentTask,
        })}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      id={currentTask.taskId}
      className={`taskContainer  ${className}`}
      style={{ ...style }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p className="tasklabel">{currentTask.task && currentTask.task}</p>

      <p className="taskhour">
        {currentTask.taskStart &&
          currentTask.taskEnd &&
          `${millisecondsToDate(currentTask.taskStart).formattedDate} - ${
            millisecondsToDate(currentTask.taskEnd).formattedDate
          }`}
      </p>
    </div>
  );
};

export default memo(TaskContainer);
