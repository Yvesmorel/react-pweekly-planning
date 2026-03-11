import { memo } from "react";
import { GroupsHeadContainerPropsType } from "../../definitions";

const GroupsHeadContainer = ({
  groupsHeadRender,
  style,
  className,
}: GroupsHeadContainerPropsType) => {
  if (groupsHeadRender) {
    return <>{groupsHeadRender()}</>;
  }
  return (
    <div className={`${className}`} style={style}>
      WeeklyCalendar
    </div>
  );
};

export default memo(GroupsHeadContainer);
