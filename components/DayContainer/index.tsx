import { memo } from "react";
import { DayPropsType } from "../../definitions";

const DayContainer = ({
  dayIndex,
  dayOfTheMonth,
  day,
  dayMonth,
  dayYear,
  dayRender,
  className,
  style,
}: DayPropsType) => {
  if (dayRender) {
    return (
      <>
        {dayRender({
          dayIndex,
          day,
          dayOfTheMonth,
          dayMonth,
          dayYear,
        })}
      </>
    );
  }

  return (
    <div className={`${className}`} style={style}>
      {`${day}. ${dayOfTheMonth}`}
    </div>
  );
};

export default memo(DayContainer);
