import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
const SumHoursContainer = ({ groupId, tasks, weekOffset, calendarDate, sumHoursByGroups, sumHoursRender, className, style, }) => {
    if (sumHoursRender) {
        return (_jsx(_Fragment, { children: sumHoursRender({
                groupId,
                tasks,
                weekOffset,
                calendarDate,
                sumHoursByGroups,
            }) }));
    }
    return (_jsx("div", { style: Object.assign({ textAlign: "right", marginRight: "5px" }, style), className: `${className}`, children: sumHoursByGroups }));
};
export default memo(SumHoursContainer);
