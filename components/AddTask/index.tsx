import { memo } from "react";
import { AddTaskPropsType } from "../../definitions";

const AddTask = ({
  currentGroup,
  handleAddTask,
  addTaskRender,
  dayInfo,
  addTaskStyle,
  addTaskClassName,
}: AddTaskPropsType) => {
  if (addTaskRender) {
    return (
      <>
        {addTaskRender({
          currentGroup,
          dayInfo,
        })}
      </>
    );
  }

  const handleClick = () => {
    if (!handleAddTask) return;
    handleAddTask(currentGroup, dayInfo);
  };

  return (
    <div
      onClick={handleClick}
      style={addTaskStyle}
      className={`addPlanStyle ${addTaskClassName}`}
    >
      +
    </div>
  );
};

export default memo(AddTask);
