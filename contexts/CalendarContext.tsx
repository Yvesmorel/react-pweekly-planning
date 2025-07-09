import { createContext, useContext } from "react";
import { GroupPropsType } from "../definitions";


type CalendarContextProviderPropsType = {
  children: React.ReactNode;
  groups: GroupPropsType[];
  weekOffset: number;
  date:Date
};

type CalendarContextType = {
  groups: GroupPropsType[];
  weekOffset: number;
  date:Date
};
const CalendarContext = createContext<CalendarContextType>({
  groups: [],
  weekOffset: 0,
  date:new Date()
});

const CalendarContextProvider = ({
  groups,
  weekOffset,
  children,
  date
}: CalendarContextProviderPropsType) => {
  return (
    <CalendarContext.Provider value={{ groups, weekOffset ,date}}>
      {children}
    </CalendarContext.Provider>
  );
};


export const useCalendarContext = () => useContext(CalendarContext);
export default CalendarContextProvider;
