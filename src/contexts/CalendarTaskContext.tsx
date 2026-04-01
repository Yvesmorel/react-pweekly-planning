import { createContext, useContext } from "react";
import { TaskFeildsType } from "../definitions";
import { useCalendarTask } from "../hooks/useCalendarTask";
import { TasksStore } from "../definitions";
type Task = TaskFeildsType;

type TaskBucket = {
  list: Task[];
  indexMap: Record<string, number>;
  sumOfTaskDuration: number;
};



type CalendarTaskContextProviderPropsType = {
  children: React.ReactNode;
  timeZone?: string;
  hashScope?: "week" | "group" | "day";
};

type CalendarTaskContextType = {
  tasks: TasksStore;
  addTask: (task: Task) => void;
  getTasks: (hash: string) => Task[];
  updateTask: (hash: string, taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (hash: string, taskId: string) => void;
  cleanExpiredTasks: () => void;
  cleanExpiredTasksByHash: (hash: string) => void;
  isValidTask: (task: Task) => boolean;
  getTask: (hash: string, taskId: string) => TaskFeildsType | undefined,
  hashScope?: "week" | "group" | "day";
};

const CalendarTaskContext = createContext<CalendarTaskContextType>({
  tasks: { buckets: {}, dataLength: 0, taskCache: {}, maxBucketSize: 0 },
  addTask: () => { },
  getTasks: () => [],
  updateTask: () => { },
  deleteTask: () => { },
  cleanExpiredTasks: () => { },
  cleanExpiredTasksByHash: () => { },
  isValidTask: () => false,
  getTask: () => undefined,
  hashScope: "week"
});

const CalendarTaskContextProvider = ({
  children,
  hashScope
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
  } = useCalendarTask(hashScope || "week");

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
        getTask,
        hashScope
      }}
    >
      {children}
    </CalendarTaskContext.Provider>
  );
};

export const useCalendarTaskContext = () => useContext(CalendarTaskContext);
export default CalendarTaskContextProvider;
