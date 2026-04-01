import React, { useRef, useMemo } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { TaskContainerPropsType } from "../../definitions";
import TaskContainer from ".";

interface TaskVirtualProps extends TaskContainerPropsType {
  index?: number;
}

const TaskVirtual = (props: TaskVirtualProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { entry, height } = useIntersectionObserver(ref, {
    rootMargin: "200px", // Margin to pre-render tasks before they appear
    threshold: 0,
  });

  const isVisible = !!entry?.isIntersecting;

  return (
    <div
      ref={ref}
      style={{
        minHeight: isVisible ? "auto" : `${height}px`,
        width: "100%",
        marginBottom: "4px"
      }}
      data-index={props.index}
    >
      {isVisible ? (
        <TaskContainer {...props} />
      ) : (
        <div style={{ height: `${height}px`, backgroundColor: "rgba(200, 200, 200, 0.1)", borderRadius: "4px" }}></div>
      )}
    </div>
  );
};

export default React.memo(TaskVirtual);
