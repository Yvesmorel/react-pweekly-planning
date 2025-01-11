import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import { millisecondsToDate } from "../../lib/utils";
const TaskContainer = ({ handleDragTask, taskRender, handleDragTaskEnd, style, className, currentTask, handleClickTask, }) => {
    const handleDragStart = (event) => {
        if (!handleDragTask)
            return;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", currentTask.taskId);
        window.sessionStorage.setItem("calendardragtaskId", currentTask.taskId);
        window.sessionStorage.setItem("calendardragtaskStart", `${currentTask.taskStart}`);
        window.sessionStorage.setItem("calendardragtaskEnd", `${currentTask.taskEnd}`);
        window.sessionStorage.setItem("calendardragdayIndex", `${currentTask.dayIndex}`);
        handleDragTask(event, currentTask);
    };
    const handleDragEnd = (event) => {
        if (!handleDragTaskEnd)
            return;
        handleDragTaskEnd(event);
    };
    const handleClick = () => {
        if (!handleClickTask)
            return;
        handleClickTask(currentTask);
    };
    if (taskRender) {
        return (_jsx("div", { onClick: handleClick, id: currentTask.taskId, className: `taskContainer ${className}`, style: Object.assign({}, style), draggable: true, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: taskRender({
                currentTask,
            }) }));
    }
    return (_jsxs("div", { onClick: handleClick, id: currentTask.taskId, className: `taskContainer  ${className}`, style: Object.assign({}, style), draggable: true, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: [_jsx("p", { className: "tasklabel", children: currentTask.task && currentTask.task }), _jsx("p", { className: "taskhour", children: currentTask.taskStart &&
                    currentTask.taskEnd &&
                    `${millisecondsToDate(currentTask.taskStart).formattedDate} - ${millisecondsToDate(currentTask.taskEnd).formattedDate}` })] }));
};
export default memo(TaskContainer);
