import { memo } from "react";
import { SumHoursHeadContainerPropsType } from "../../definitions";

const SumHoursHead = ({
  sumHoursHeadRender,
  className,
  style,
}: SumHoursHeadContainerPropsType) => {
  if (sumHoursHeadRender) {
    return <>{sumHoursHeadRender()}</>;
  }
  return (
    <div
      className={`${className}`}
      style={{ textAlign: "right", marginRight: "5px", ...style }}
    >
      Hours
    </div>
  );
};

export default memo(SumHoursHead);
