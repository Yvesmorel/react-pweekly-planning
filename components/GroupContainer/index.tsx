import { memo } from "react";
import { GroupPropsType } from "../../definitions";
import { groupContainerStyle } from "../../lib/slyles";

const GroupContainer = ({
  className,
  style,
  groupRender,
  currentGroup,
  handleClickGroup,
}: GroupPropsType) => {
  if (groupRender) {
    return <>{groupRender({ currentGroup })}</>;
  }

  const handleClick = () => {
    if (!handleClickGroup) return;
    handleClickGroup(currentGroup);
  };

  return (
    <div
      onClick={handleClick}
      className={`${className}`}
      style={{ ...groupContainerStyle, ...style }}
    >
      {currentGroup.imageUrl && (
        <img
          width={30}
          height={30}
          src={currentGroup.imageUrl}
          alt="groupimg"
        />
      )}

      <label>{currentGroup.label && currentGroup.label}</label>
    </div>
  );
};

export default memo(GroupContainer);
