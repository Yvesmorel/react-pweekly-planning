import { createContext, useContext, useRef } from "react";
import { GroupPropsType, TaskFeildsType } from "../definitions";
import { useCalendarTask } from "../hooks/useCalendarTask";

type Task = TaskFeildsType

type TaskBucket = {
  list: Task[];
  indexMap: Record<string, number>;
};

type TasksStore = Record<string, TaskBucket>;
type CalendarContextProviderPropsType = {
  children: React.ReactNode;
};

type CalendarContextType = {

};
const CalendarContext = createContext<CalendarContextType>({

});

export const CalendarContextProvider = ({

  children,

}: CalendarContextProviderPropsType) => {



  return (
    <CalendarContext.Provider value={{}}>
      {children}
    </CalendarContext.Provider>
  );
};


export const useCalendarContext = () => useContext(CalendarContext);
export default CalendarContextProvider;
