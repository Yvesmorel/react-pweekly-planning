import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const CalendarContext = createContext({
    groups: [],
    weekOffset: 0,
    date: new Date()
});
const CalendarContextProvider = ({ groups, weekOffset, children, date }) => {
    return (_jsx(CalendarContext.Provider, { value: { groups, weekOffset, date }, children: children }));
};
export const useCalendarContext = () => useContext(CalendarContext);
export default CalendarContextProvider;
