import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import "./style.css";
import CalendarForWeek from "./components/CalendarForWeek";
import CalendarForDay from "./components/CalendarForday";
/**
 * Calendar component to display tasks and groups in a weekly view.
 *
 * @param {Object} props - The props for the Calendar component.
 * @param {React.CSSProperties} [props.style] - Additional styles for the calendar component.
 * @param {string} [props.className] - Additional class names for the calendar component.
 * @param {Array} props.groups - Array of group data to be displayed in the calendar.
 * @param {number} [props.weekOffset] - Offset for the week (e.g., -1 for last week, 0 for current week, 1 for next week).
 * @param {Date} props.date - The current date to display in the calendar.
 * @param {Function} [props.groupRender] - Custom render function for a group.
 * @param {Function} [props.dayRender] - Custom render function for a day.
 * @param {React.CSSProperties} [props.rowsStyle] - Additional styles for the rows.
 * @param {React.CSSProperties} [props.groupsColsStyle] - Additional styles for the group columns.
 * @param {React.CSSProperties} [props.daysColsStyle] - Additional styles for the day columns.
 * @param {Function} [props.addTaskRender] - Custom render function for the add task button.
 * @param {Function} [props.handleAddTask] - Handler function for adding a new task.
 * @param {string} [props.dayClassName] - Additional class names for the days.
 * @param {React.CSSProperties} [props.dayStyle] - Additional styles for the days.
 * @param {string} [props.groupClassName] - Additional class names for the groups.
 * @param {React.CSSProperties} [props.groupStyle] - Additional styles for the groups.
 * @param {string} [props.addTaskClassName] - Additional class names for the add task button.
 * @param {React.CSSProperties} [props.addTaskStyle] - Additional styles for the add task button.
 * @param {Array} props.tasks - Array of tasks to be displayed in the calendar.
 * @param {Function} [props.handleDragTask] - Handler function for dragging a task.
 * @param {Function} [props.handleDropTask] - Handler function for dropping a task.
 * @param {Function} [props.taskRender] - Custom render function for a task.
 * @param {Function} [props.groupsHeadRender] - Custom render function for the groups header.
 * @param {Function} [props.sumHoursRender] - Custom render function for the sum of hours.
 * @param {Function} [props.sumHoursHeadRender] - Custom render function for the sum of hours header.
 * @param {Function} [props.handleDragTaskEnd] - Handler function for ending the drag of a task.
 * @param {string} [props.rowsClassName] - Additional class names for the rows.
 * @param {string} [props.daysColsClassName] - Additional class names for the day columns.
 * @param {string} [props.sumHoursContainerClassName] - Additional class names for the sum hours container.
 * @param {React.CSSProperties} [props.sumHoursContainerStyle] - Additional styles for the sum hours container.
 * @param {string} [props.groupHeadContainerClassName] - Additional class names for the group head container.
 * @param {React.CSSProperties} [props.groupHeadContainerStyle] - Additional styles for the group head container.
 * @param {string} [props.groupsColsClassName] - Additional class names for the group columns.
 * @param {string} [props.taskContainerClassName] - Additional class names for the task container.
 * @param {React.CSSProperties} [props.taskContainerStyle] - Additional styles for the task container.
 * @param {string} [props.sumHoursHeadClassName] - Additional class names for the sum hours header.
 * @param {React.CSSProperties} [props.sumHoursHeadStyle] - Additional styles for the sum hours header.
 * @param {Function} [props.handleClickGroup] - Handler function for clicking a group.
 * @param {Function} [props.handleClickTask] - Handler function for clicking a task.
 * @returns {JSX.Element} The rendered Calendar component.
 */
const Calendar = (props) => {
    return (_jsx(_Fragment, { children: _jsx(CalendarForWeek, Object.assign({}, props)) }));
};
export default Calendar;
export { CalendarForDay };
