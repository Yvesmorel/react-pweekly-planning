import "./style.css";
import {
  AddTaskPropsType,
  CalendarPropsType,
  DayPropsType,
  GroupPropsType,
  StyleType,
  TaskContainerPropsType,
  GroupsHeadContainerPropsType,
  SumHoursContainerPropsType,
  SumHoursHeadContainerPropsType,
} from "./definitions";
import {
  getWeekDays,
  getDayHourly,
  calculerEcartSemaine,
  getSessionStorageRecordForDragAndDrop,
  sumHoursByGroups,
  millisecondsToDate,
  compareWeekOffset,
} from "./lib/utils";

const tableStyle: StyleType = {
  width: "100%",
  height: "150px",
  borderRadius: "0.5rem",
  zIndex: 10,
};

const trStyle: StyleType = {
  color: "#0f5173",
  fontWeight: "300",
  position: "sticky",
  top: 0,
};

const thStyle: StyleType = {
  color: "#0f5173",
  paddingLeft: "5px",
};

const weekDayThStyle: StyleType = {};

const totalThStyle: StyleType = {
  width: "40px",
  textAlign: "right",
  paddingRight: "2px",
};

const tdStyle: StyleType = {
  height: "auto",
  width: "150px",
};
const tableTrStyle: StyleType = {
  borderBottom: "1.5px solid #0f52737e",
  // backgroundColor: "#f2f8fb",
  padding: "2px",
};
const tableTdStyle: StyleType = {
  borderLeft: "0.74px solid rgba(198, 219, 225, 0.68)",
  borderRight: "0.74px solid rgba(198, 219, 225, 0.68)",
};

const groupContainerStyle: StyleType = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem", // Correspond à gap-3
  padding: "0.75rem", // Correspond à p-3
  color: "#0f5173",
  cursor: "pointer",
};

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
const Calendar = ({
  style,
  className,
  groups,
  weekOffset,
  date,
  groupRender,
  dayRender,
  rowsStyle,
  groupsColsStyle,
  daysColsStyle,
  addTaskRender,
  handleAddTask,
  dayClassName,
  dayStyle,
  groupClassName,
  groupStyle,
  addTaskClassName,
  addTaskStyle,
  tasks,
  handleDragTask,
  handleDropTask,
  taskRender,
  groupsHeadRender,
  sumHoursRender,
  sumHoursHeadRender,
  handleDragTaskEnd,
  rowsClassName,
  daysColsClassName,
  sumHoursContainerClassName,
  sumHoursContainerStyle,
  groupHeadContainerClassName,
  groupHeadContainerStyle,
  groupsColsClassName,
  taskContainerClassName,
  taskContainerStyle,
  sumHoursHeadClassName,
  sumHoursHeadStyle,
  handleClickGroup,
  handleClickTask,
}: CalendarPropsType) => {
  const weekOffsetByDate = calculerEcartSemaine(date);
  const weekDays = getWeekDays(weekOffsetByDate || weekOffset || 0);
  const dailyHours = getDayHourly(weekOffsetByDate || weekOffset || 0);

  const handleDragOver = (event: React.DragEvent<HTMLTableDataCellElement>) => {
    event.preventDefault();
  };
  return (
    <table className={`${className}`} style={{ ...tableStyle, ...style }}>
      <thead>
        <tr
          className={`${rowsClassName}`}
          style={{ ...trStyle, ...tableTrStyle, ...rowsStyle }}
          key=""
        >
          <th style={thStyle}>
            <GroupsHeadContainer
              className={`${groupHeadContainerClassName}`}
              style={groupHeadContainerStyle}
              groupsHeadRender={groupsHeadRender}
            />
          </th>
          {weekDays.map((day, i) => (
            <th
              key={i}
              className={`${daysColsClassName}`}
              style={{ ...weekDayThStyle, ...daysColsStyle }}
            >
              <DayContainer
                style={dayStyle}
                className={dayClassName}
                dayIndex={i}
                dayRender={dayRender}
                day={day.day}
                dayOfTheMonth={day.dayOfTheMonth}
                dayMonth={day.dayMonth}
                dayYear={day.dayYear}
              />
            </th>
          ))}
          <th style={totalThStyle}>
            <SumHoursHead
              className={sumHoursHeadClassName}
              style={sumHoursHeadStyle}
              sumHoursHeadRender={sumHoursHeadRender}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {groups?.map((group, i) => (
          <tr
            key={`${i} tr`}
            className={`${rowsClassName}`}
            style={{ ...tableTrStyle, ...rowsStyle }}
          >
            <td
              className={`${groupsColsClassName}`}
              key={i}
              style={{ ...tdStyle, ...tableTdStyle, ...groupsColsStyle }}
            >
              <GroupContainer
                style={groupStyle}
                className={groupClassName}
                groupRender={groupRender}
                currentGroup={group}
                handleClickGroup={handleClickGroup}
              />
            </td>
            {dailyHours.map((_, positionDay) => (
              <td
                style={{ width: "8vw", ...tableTdStyle }}
                key={`td-${group.id}day-i${positionDay}`}
                onDragOver={handleDragOver}
                onDrop={(event) => {
                  if (!handleDropTask || !tasks) return;
                  const dropInfo = getSessionStorageRecordForDragAndDrop(
                    tasks,
                    positionDay,
                    group.id
                  );
                  if (!dropInfo) return;
                  handleDropTask(
                    event,
                    dropInfo.taskDropStart,
                    dropInfo.taskDropEnd,
                    dropInfo.taskDropDate,
                    group.id,
                    positionDay,
                    dropInfo.newTask,
                    dropInfo.newTasks
                  );
                }}
                id={`td-${group.id}day-i`}
              >
                <div
                  key={positionDay}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    padding: "5px",
                  }}
                >
                  <>
                    {tasks
                      ?.filter(
                        (task) =>
                          task.dayIndex === positionDay &&
                          task.groupId === group.id &&
                          compareWeekOffset(
                            date,
                            weekOffset || 0,
                            task.taskDate
                          )
                      )
                      .sort((a, b) => a.taskStart - b.taskStart)
                      .map((task, taskKey) => {
                        return (
                          <TaskContainer
                            key={`${taskKey} task`}
                            handleDragTask={handleDragTask}
                            taskRender={taskRender}
                            handleDragTaskEnd={handleDragTaskEnd}
                            style={taskContainerStyle}
                            className={`${taskContainerClassName}`}
                            currentTask={task}
                            handleClickTask={handleClickTask}
                          />
                        );
                      })}
                  </>

                  <AddTask
                    addTaskStyle={addTaskStyle}
                    addTaskClassName={addTaskClassName}
                    currentGroup={group}
                    dayInfo={dailyHours[positionDay]}
                    addTaskRender={addTaskRender}
                    handleAddTask={handleAddTask}
                  />
                </div>
              </td>
            ))}
            <td key={`${i}sumHours`}>
              <SumHoursContainer
                groupId={group.id}
                tasks={tasks}
                weekOffset={weekOffset || 0}
                calendarDate={date}
                sumHoursRender={sumHoursRender}
                sumHoursByGroups={sumHoursByGroups(
                  group.id,
                  tasks,
                  weekOffset || 0,
                  date
                )}
                className={sumHoursContainerClassName}
                style={sumHoursContainerStyle}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SumHoursHead = ({
  sumHoursHeadRender,
  className,
  style,
}: SumHoursHeadContainerPropsType) => {
  if (sumHoursHeadRender) {
    return <>{sumHoursHeadRender()}</>;
  }
  return (
    <div
      className={`${className}`}
      style={{ textAlign: "right", marginRight: "5px", ...style }}
    >
      Hours
    </div>
  );
};

const SumHoursContainer = ({
  groupId,
  tasks,
  weekOffset,
  calendarDate,
  sumHoursByGroups,
  sumHoursRender,
  className,
  style,
}: SumHoursContainerPropsType) => {
  if (sumHoursRender) {
    return (
      <>
        {sumHoursRender({
          groupId,
          tasks,
          weekOffset,
          calendarDate,
          sumHoursByGroups,
        })}
      </>
    );
  }

  return (
    <div
      style={{ textAlign: "right", marginRight: "5px", ...style }}
      className={`${className}`}
    >
      {sumHoursByGroups}
    </div>
  );
};

const DayContainer = ({
  dayIndex,
  dayOfTheMonth,
  day,
  dayMonth,
  dayYear,
  dayRender,
  className,
  style,
}: DayPropsType) => {
  if (dayRender) {
    return (
      <>
        {dayRender({
          dayIndex,
          day,
          dayOfTheMonth,
          dayMonth,
          dayYear,
        })}
      </>
    );
  }

  return (
    <div className={`${className}`} style={style}>
      {`${day}. ${dayOfTheMonth}`}
    </div>
  );
};

const GroupContainer = ({
  className,
  style,
  groupRender,
  currentGroup,
  handleClickGroup,
}: GroupPropsType) => {
  if (groupRender) {
    return <>{groupRender({ currentGroup })}</>;
  }

  const handleClick = () => {
    if (!handleClickGroup) return;
    handleClickGroup(currentGroup);
  };
  return (
    <div
      onClick={handleClick}
      className={`${className}`}
      style={{ ...groupContainerStyle, ...style }}
    >
      {currentGroup.imageUrl && (
        <img
          width={30}
          height={30}
          src={currentGroup.imageUrl}
          alt="groupimg"
        />
      )}
      <label>{currentGroup.label && currentGroup.label}</label>
    </div>
  );
};

const AddTask = ({
  currentGroup,
  handleAddTask,
  addTaskRender,
  dayInfo,
  addTaskStyle,
  addTaskClassName,
}: AddTaskPropsType) => {
  if (addTaskRender) {
    return (
      <>
        {addTaskRender({
          currentGroup,
          dayInfo,
        })}
      </>
    );
  }

  const handleClick = () => {
    if (!handleAddTask) return;
    handleAddTask(currentGroup, dayInfo);
  };

  return (
    <div
      onClick={handleClick}
      style={addTaskStyle}
      className={`addPlanStyle ${addTaskClassName}`}
    >
      +
    </div>
  );
};

const TaskContainer = ({
  handleDragTask,
  taskRender,
  handleDragTaskEnd,
  style,
  className,
  currentTask,
  handleClickTask,
}: TaskContainerPropsType) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (!handleDragTask) return;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", currentTask.taskId);
    window.sessionStorage.setItem("calendardragtaskId", currentTask.taskId);
    window.sessionStorage.setItem(
      "calendardragtaskStart",
      `${currentTask.taskStart}`
    );
    window.sessionStorage.setItem(
      "calendardragtaskEnd",
      `${currentTask.taskEnd}`
    );
    window.sessionStorage.setItem(
      "calendardragdayIndex",
      `${currentTask.dayIndex}`
    );
    handleDragTask(event, currentTask);
  };
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    if (!handleDragTaskEnd) return;
    handleDragTaskEnd(event);
  };
  const handleClick = () => {
    if (!handleClickTask) return;
    handleClickTask(currentTask);
  };
  if (taskRender) {
    return (
      <div
        onClick={handleClick}
        id={currentTask.taskId}
        className={`taskContainer ${className}`}
        style={{ ...style }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {taskRender({
          currentTask,
        })}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      id={currentTask.taskId}
      className={`taskContainer  ${className}`}
      style={{ ...style }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p className="tasklabel">{currentTask.task && currentTask.task}</p>
      <p className="taskhour">
        {currentTask.taskStart &&
          currentTask.taskEnd &&
          `${millisecondsToDate(currentTask.taskStart).formattedDate} - ${
            millisecondsToDate(currentTask.taskEnd).formattedDate
          }`}
      </p>
    </div>
  );
};

const GroupsHeadContainer = ({
  groupsHeadRender,
  style,
  className,
}: GroupsHeadContainerPropsType) => {
  if (groupsHeadRender) {
    return <>{groupsHeadRender()}</>;
  }
  return (
    <div className={`${className}`} style={style}>
      WeeklyCalendar
    </div>
  );
};

export const updateCalendarDateWithOffset = (
  offset: number,
  calendarDate: Date
) => {
  const newDate = new Date(calendarDate);
  newDate.setDate(newDate.getDate() + offset);
  return newDate;
};

export const updateOffsetWithDateCalendar = (calendarDate: Date) => {
  return calculerEcartSemaine(calendarDate);
};

export const millisecondsToHours = (milliseconds: number) => {
  return millisecondsToDate(milliseconds).formattedDate;
};

export default Calendar;
