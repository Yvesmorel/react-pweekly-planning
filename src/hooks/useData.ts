import { useLayoutEffect, useMemo, useState } from "react";
import { TasksType } from "../definitions";





export const useData = (
    sliceIndex: number,
    itemsByLine: number,
    windowLines: number,
    tasks: TasksType,
    bottomBufferSize: number,
    topBufferSize: number
) => {
    console.log(sliceIndex, itemsByLine, windowLines, tasks, "virtual");
    const visibleTasks = useMemo(
        () =>
            tasks.slice(
                Math.max(sliceIndex - topBufferSize, 0) * itemsByLine,
                Math.min(
                    tasks.length,
                    (windowLines + bottomBufferSize) * itemsByLine +
                    sliceIndex * itemsByLine,
                ),
            ),
        [sliceIndex, itemsByLine, windowLines, tasks],
    );

    return { visibleTasks };
};