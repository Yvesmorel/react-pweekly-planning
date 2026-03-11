import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import { groupContainerStyle } from "../../lib/slyles";
const GroupContainer = ({ className, style, groupRender, currentGroup, handleClickGroup, }) => {
    if (groupRender) {
        return _jsx(_Fragment, { children: groupRender({ currentGroup }) });
    }
    const handleClick = () => {
        if (!handleClickGroup)
            return;
        handleClickGroup(currentGroup);
    };
    return (_jsxs("div", { onClick: handleClick, className: `${className}`, style: Object.assign(Object.assign({}, groupContainerStyle), style), children: [currentGroup.imageUrl && (_jsx("img", { width: 30, height: 30, src: currentGroup.imageUrl, alt: "groupimg" })), _jsx("label", { children: currentGroup.label && currentGroup.label })] }));
};
export default memo(GroupContainer);
