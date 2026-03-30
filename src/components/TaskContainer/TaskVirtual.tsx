import React, { useRef, useMemo } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { TaskContainerPropsType } from "../../definitions";
import TaskContainer from ".";

const TaskVirtual = (props: TaskContainerPropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    rootMargin: "200px", // Margin to pre-render tasks before they appear
    threshold: 0,
  });

  const isVisible = !!entry?.isIntersecting;

  return (
    <div
      ref={ref}
      style={{
        minHeight: isVisible ? "auto" : "40px",
        width: "100%",
        marginBottom: "4px"
      }}
    >
      {isVisible ? (
        <TaskContainer {...props} />
      ) : (
        <div style={{ height: "60px", backgroundColor: "rgba(200, 200, 200, 0.1)", borderRadius: "4px" }}></div>
      )}
    </div>
  );
};

export default React.memo(TaskVirtual);
