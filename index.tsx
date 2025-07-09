import "./style.css";
import { CalendarPropsType } from "./definitions";
import CalendarForWeek from "./components/CalendarForWeek";
import CalendarForDay from "./components/CalendarForday";
/**
 * Calendar component to display tasks and groups in a weekly view.
 *
 * @param {CalendarPropsType} props - The props for the Calendar component.
 * @param {number} [props.weekOffset] - Offset for the week (e.g., -7 for last week, 0 for current week, 7 for next week).
 * @param {GroupFeildsType[]} props.groups - Array of group data to be displayed in the calendar.
 * @param {string} [props.className] - Additional class names for the calendar component.
 * @param {React.CSSProperties} [props.style] - Additional styles for the calendar component.
 * @param {Date} props.date - The current date to display in the calendar.
 * @param {(currentGroup: { currentGroup: GroupFeildsType }) => React.ReactNode} [props.groupRender] - Custom render function for a group.
 * @param {({ dayIndex, day, dayOfTheMonth, dayMonth, dayYear }: { dayIndex: number; day: string; dayOfTheMonth: number; dayMonth: string; dayYear: number }) => React.ReactNode} [props.dayRender] - Custom render function for a day.
 * @param {(currentTask: { currentTask: TaskFeildsType }) => React.ReactNode} [props.taskRender] - Custom render function for a task.
 * @param {React.CSSProperties} [props.rowsStyle] - Additional styles for the rows.
 * @param {string} [props.rowsClassName] - Additional class names for the rows.
 * @param {React.CSSProperties} [props.groupsColsStyle] - Additional styles for the group columns.
 * @param {string} [props.groupsColsClassName] - Additional class names for the group columns.
 * @param {React.CSSProperties} [props.daysColsStyle] - Additional styles for the day columns.
 * @param {string} [props.daysColsClassName] - Additional class names for the day columns.
 * @param {string} [props.addTaskClassName] - Additional class names for the add-task button.
 * @param {React.CSSProperties} [props.addTaskStyle] - Additional styles for the add-task button.
 * @param {string} [props.groupContainerClassName] - Additional class names for the group containers.
 * @param {React.CSSProperties} [props.groupContainerStyle] - Additional styles for the group containers.
 * @param {string} [props.dayClassName] - Additional class names for the day elements.
 * @param {React.CSSProperties} [props.dayStyle] - Additional styles for the day elements.
 * @param {React.CSSProperties} [props.taskContainerStyle] - Additional styles for the task container.
 * @param {string} [props.taskContainerClassName] - Additional class names for the task container.
 * @param {React.CSSProperties} [props.groupHeadContainerStyle] - Additional styles for the group header container.
 * @param {string} [props.groupHeadContainerClassName] - Additional class names for the group header container.
 * @param {React.CSSProperties} [props.sumHoursContainerStyle] - Additional styles for the sum-of-hours container.
 * @param {string} [props.sumHoursContainerClassName] - Additional class names for the sum-of-hours container.
 * @param {React.CSSProperties} [props.sumHoursHeadStyle] - Additional styles for the sum-of-hours header.
 * @param {string} [props.sumHoursHeadClassName] - Additional class names for the sum-of-hours header.
 * @param {(currentGroup: GroupFeildsType, dayInfo: dayInfoType) => void} [props.handleAddTask] - Handler function for adding a new task.
 * @param {({ currentGroup, dayInfo }: { currentGroup: GroupFeildsType; dayInfo: dayInfoType }) => React.ReactNode} [props.addTaskRender] - Custom render function for adding a task.
 * @param {TasksType} props.tasks - Array of tasks to be displayed in the calendar.
 * @param {(event: React.DragEvent<HTMLDivElement>, currentTask: TaskFeildsType) => void} [props.handleDragTask] - Handler function for dragging a task.
 * @param {(event: React.DragEvent<HTMLDivElement>, taskStart: number, taskEnd: number, taskDate: Date, groupId: string, dayIndex: number, newTask: TaskFeildsType, newTasks: TasksType) => void} [props.handleDropTask] - Handler function for dropping a task.
 * @param {(event: React.DragEvent<HTMLDivElement>) => void} [props.handleDragTaskEnd] - Handler function for ending the drag of a task.
 * @param {() => React.ReactNode} [props.groupsHeadRender] - Custom render function for the groups header.
 * @param {({
 *   groupId,
 *   tasks,
 *   weekOffset,
 *   calendarDate,
 *   sumHoursByGroups
 * }: {
 *   groupId: string;
 *   tasks: TasksType;
 *   weekOffset: number;
 *   calendarDate: Date;
 *   sumHoursByGroups: number;
 * }) => React.ReactNode} [props.sumHoursRender] - Custom render function for the sum of hours.
 * @param {() => React.ReactNode} [props.sumHoursHeadRender] - Custom render function for the sum-of-hours header.
 * @param {(currentTask: TaskFeildsType) => void} [props.handleClickTask] - Handler function for clicking a task.
 * @param {(currentGroup: GroupFeildsType) => void} [props.handleClickGroup] - Handler function for clicking a group.
 * @param {0|1|2|3|4|5|6} [props.dayOffset] - Offset index for the day column (0 = first day of week, …, 6 = last day).
 * @param {React.CSSProperties} [props.dayColsStyle] - Additional styles for the day columns.
 * @param {string} [props.dayColsClassName] - Additional class names for the day columns.
 * @param {React.CSSProperties} [props.hoursColsStyle] - Additional styles for the hours columns.
 * @param {string} [props.hoursColsClassName] - Additional class names for the hours columns.
 */

const Calendar = (props: CalendarPropsType) => {
  return (
    <>
      <CalendarForWeek {...props} />
    </>
  );
};

export default Calendar;

export { CalendarForDay };
