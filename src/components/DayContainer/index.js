import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
const DayContainer = ({ dayIndex, dayOfTheMonth, day, dayMonth, dayYear, dayRender, className, style, }) => {
    if (dayRender) {
        return (_jsx(_Fragment, { children: dayRender({
                dayIndex,
                day,
                dayOfTheMonth,
                dayMonth,
                dayYear,
            }) }));
    }
    return (_jsx("div", { className: `${className}`, style: style, children: `${day}. ${dayOfTheMonth}` }));
};
export default memo(DayContainer);
