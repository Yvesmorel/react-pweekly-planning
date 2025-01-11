import { memo } from "react";
import { SumHoursContainerPropsType } from "../../definitions";

const SumHoursContainer = ({
  groupId,
  tasks,
  weekOffset,
  calendarDate,
  sumHoursByGroups,
  sumHoursRender,
  className,
  style,
}: SumHoursContainerPropsType) => {
  if (sumHoursRender) {
    return (
      <>
        {sumHoursRender({
          groupId,
          tasks,
          weekOffset,
          calendarDate,
          sumHoursByGroups,
        })}
      </>
    );
  }

  return (
    <div
      style={{ textAlign: "right", marginRight: "5px", ...style }}
      className={`${className}`}
    >
      {sumHoursByGroups}
    </div>
  );
};

export default memo(SumHoursContainer);
