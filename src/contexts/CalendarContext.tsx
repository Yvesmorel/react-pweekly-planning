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
  getTasks: (hash: string) => TaskFeildsType[]
};
const CalendarContext = createContext<CalendarContextType>({
  getTasks: () => []
});

const CalendarContextProvider = ({

  children,

}: CalendarContextProviderPropsType) => {
  const { getTasks } = useCalendarTask();


  return (
    <CalendarContext.Provider value={{ getTasks }}>
      {children}
    </CalendarContext.Provider>
  );
};


export const useCalendarContext = () => useContext(CalendarContext);
export default CalendarContextProvider;
