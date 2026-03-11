import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
const AddTask = ({ currentGroup, handleAddTask, addTaskRender, dayInfo, addTaskStyle, addTaskClassName, }) => {
    if (addTaskRender) {
        return (_jsx(_Fragment, { children: addTaskRender({
                currentGroup,
                dayInfo,
            }) }));
    }
    const handleClick = () => {
        if (!handleAddTask)
            return;
        handleAddTask(currentGroup, dayInfo);
    };
    return (_jsx("div", { onClick: handleClick, style: addTaskStyle, className: `addPlanStyle ${addTaskClassName}`, children: "+" }));
};
export default memo(AddTask);
