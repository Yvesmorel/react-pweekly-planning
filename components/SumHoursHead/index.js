import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
const SumHoursHead = ({ sumHoursHeadRender, className, style, }) => {
    if (sumHoursHeadRender) {
        return _jsx(_Fragment, { children: sumHoursHeadRender() });
    }
    return (_jsx("div", { className: `${className}`, style: Object.assign({ textAlign: "right", marginRight: "5px" }, style), children: "Hours" }));
};
export default memo(SumHoursHead);
