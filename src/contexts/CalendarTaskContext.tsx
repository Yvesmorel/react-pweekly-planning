import { createContext, useContext } from "react";
import { TaskFeildsType } from "../definitions";
import { useCalendarTask } from "../hooks/useCalendarTask";

type Task = TaskFeildsType;

type TaskBucket = {
  list: Task[];
  indexMap: Record<string, number>;
};

type TasksStore = Record<string, TaskBucket>;

type CalendarTaskContextProviderPropsType = {
  children: React.ReactNode;
  timeZone?: string;
};

type CalendarTaskContextType = {
  tasks: TasksStore;
  addTask: (hash: string, task: Task) => void;
  getTasks: (hash: string) => Task[];
  updateTask: (hash: string, taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (hash: string, taskId: string) => void;
  cleanExpiredTasks: () => void;
  cleanExpiredTasksByHash: (hash: string) => void;
  isValidTask: (task: Task) => boolean;
  getTask: (hash: string, taskId: string) => TaskFeildsType | undefined
};

const CalendarTaskContext = createContext<CalendarTaskContextType>({
  tasks: {},
  addTask: () => { },
  getTasks: () => [],
  updateTask: () => { },
  deleteTask: () => { },
  cleanExpiredTasks: () => { },
  cleanExpiredTasksByHash: () => { },
  isValidTask: () => false,
  getTask: () => undefined
});

const CalendarTaskContextProvider = ({
  children,
  timeZone,
}: CalendarTaskContextProviderPropsType) => {
  const {
    tasks,
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    cleanExpiredTasks,
    cleanExpiredTasksByHash,
    isValidTask,
    getTask
  } = useCalendarTask(timeZone);

  return (
    <CalendarTaskContext.Provider
      value={{
        tasks,
        addTask,
        getTasks,
        updateTask,
        deleteTask,
        cleanExpiredTasks,
        cleanExpiredTasksByHash,
        isValidTask,
        getTask
      }}
    >
      {children}
    </CalendarTaskContext.Provider>
  );
};

export const useCalendarTaskContext = () => useContext(CalendarTaskContext);
export default CalendarTaskContextProvider;
