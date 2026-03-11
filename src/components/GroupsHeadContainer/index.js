import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
const GroupsHeadContainer = ({ groupsHeadRender, style, className, }) => {
    if (groupsHeadRender) {
        return _jsx(_Fragment, { children: groupsHeadRender() });
    }
    return (_jsx("div", { className: `${className}`, style: style, children: "WeeklyCalendar" }));
};
export default memo(GroupsHeadContainer);
