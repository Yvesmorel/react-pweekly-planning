/**
 * Props for the Group component.
 */
export type GroupPropsType = {
  /** Custom render function for the group. */
  groupRender?: ({
    currentGroup,
  }: {
    currentGroup: GroupFeildsType;
  }) => React.ReactNode;
  /** Additional class names for the group component. */
  className?: string;
  /** Additional styles for the group component. */
  style?: React.CSSProperties | undefined;
  /** The current group data. */
  currentGroup: GroupFeildsType;
  /** Handler function for clicking the group. */
  handleClickGroup?: (currentGroup: GroupFeildsType) => void;
};

/**
 * Required fields for a group.
 */
type GroupRiquiredFieldsType = {
  /** Label for the group. */
  label?: string;
  /** URL of the image representing the group. */
  imageUrl?: string;
  /** Unique identifier for the group. */
  id: string;
};

/**
 * Additional fields for a group.
 */
type GroupAdditionalFieldsType = Record<any,any>;

/**
 * Fields for a group, including both required and additional fields.
 */
export type GroupFeildsType = GroupRiquiredFieldsType &
  GroupAdditionalFieldsType;

/**
 * Props for the GroupComponent.
 */
export type GroupComponentPropsType = {
  /** Custom render function for the group. */
  groupRender?: ({
    currentGroup,
  }: {
    currentGroup: GroupFeildsType;
  }) => React.ReactNode;
  /** Additional class names for the group component. */
  className?: string;
  /** Additional styles for the group component. */
  style?: React.CSSProperties | undefined;
};

/**
 * Props for the Days component.
 */
export type DaysPropsType = {
  /** Custom render function for a day. */
  dayRender?: ({
    dayIndex,
    day,
    dayOfTheMonth,
    dayMonth,
    dayYear,
  }: {
    dayIndex?: number;
    day?: string;
    dayOfTheMonth?: number;
    dayMonth?: string;
    dayYear?: number;
  }) => React.ReactNode;
  /** Additional class names for the days component. */
  className?: string;
  /** Additional styles for the days component. */
  style?: React.CSSProperties | undefined;
};

/**
 * Props for a single day.
 */
export type DayPropsType = {
  /** Index of the day. */
  dayIndex: number;
  /** Name of the day. */
  day: string;
  /** Day of the month. */
  dayOfTheMonth: number;
  /** Custom render function for a day. */
  dayRender?: ({
    dayIndex,
    day,
    dayOfTheMonth,
    dayMonth,
    dayYear,
  }: {
    dayIndex: number;
    day: string;
    dayOfTheMonth: number;
    dayMonth: string;
    dayYear: number;
  }) => React.ReactNode;
  /** Month of the day. */
  dayMonth: string;
  /** Year of the day. */
  dayYear: number;
  /** Additional class names for the day component. */
  className?: string;
  /** Additional styles for the day component. */
  style?: React.CSSProperties | undefined;
};

/**
 * Props for the Calendar component.
 */
export type CalendarPropsType = {
  /** Offset for the week (e.g., -7 for last week, 0 for current week, 7 for next week). */
  weekOffset?: number;
  /** Array of group data to be displayed in the calendar. */
  groups: GroupFeildsType[];
  /** Additional class names for the calendar component. */
  className?: string;
  /** Additional styles for the calendar component. */
  style?: React.CSSProperties | undefined;
  /** The current date to display in the calendar. */
  date: Date;
  /** Custom render function for a group. */
  groupRender?: ({
    currentGroup,
  }: {
    currentGroup: GroupFeildsType;
  }) => React.ReactNode;
  /** Custom render function for a day. */
  dayRender?: ({
    dayIndex,
    day,
    dayOfTheMonth,
    dayMonth,
    dayYear,
  }: {
    dayIndex: number;
    day: string;
    dayOfTheMonth: number;
    dayMonth: string;
    dayYear: number;
  }) => React.ReactNode;
  /** Custom render function for a task. */
  taskRender?: ({
    currentTask,
  }: {
    currentTask: TaskFeildsType;
  }) => React.ReactNode;
  /** Additional styles for the rows. */
  rowsStyle?: React.CSSProperties | undefined;
  /** Additional class names for the rows. */
  rowsClassName?: string;
  /** Additional styles for the group columns. */
  groupsColsStyle?: React.CSSProperties | undefined;
  /** Additional class names for the group columns. */
  groupsColsClassName?: string;
  /** Additional styles for the day columns. */
  daysColsStyle?: React.CSSProperties | undefined;
  /** Additional class names for the day columns. */
  daysColsClassName?: string;
  /** Additional class names for the add task button. */
  addTaskClassName?: string;
  /** Additional styles for the add task button. */
  addTaskStyle?: React.CSSProperties | undefined;
  /** Additional class names for the groups. */
  groupClassName?: string;
  /** Additional styles for the groups. */
  groupStyle?: React.CSSProperties | undefined;
  /** Additional class names for the days. */
  dayClassName?: string;
  /** Additional styles for the days. */
  dayStyle?: React.CSSProperties | undefined;
  /** Additional styles for the task container. */
  taskContainerStyle?: React.CSSProperties | undefined;
  /** Additional class names for the task container. */
  taskContainerClassName?: string;
  /** Additional styles for the group head container. */
  groupHeadContainerStyle?: React.CSSProperties | undefined;
  /** Additional class names for the group head container. */
  groupHeadContainerClassName?: string;
  /** Additional styles for the sum hours container. */
  sumHoursContainerStyle?: React.CSSProperties | undefined;
  /** Additional class names for the sum hours container. */
  sumHoursContainerClassName?: string;
  /** Additional styles for the sum hours header. */
  sumHoursHeadStyle?: React.CSSProperties | undefined;
  /** Additional class names for the sum hours header. */
  sumHoursHeadClassName?: string;
  /** Handler function for adding a new task. */
  handleAddTask?: (currentGroup: GroupFeildsType, dayInfo: dayInfoType) => void;
  /** Custom render function for adding a task. */
  addTaskRender?: ({
    currentGroup,
    dayInfo,
  }: {
    currentGroup: GroupFeildsType;
    dayInfo: dayInfoType;
  }) => React.ReactNode;
  /** Array of tasks to be displayed in the calendar. */
  tasks: TasksType;
  /** Handler function for dragging a task. */
  handleDragTask?: (
    event: React.DragEvent<HTMLDivElement>,
    currentTask: TaskFeildsType
  ) => void;
  /** Handler function for dropping a task. */
  handleDropTask?: (
    event: React.DragEvent<HTMLTableDataCellElement>,
    taskStart: number,
    taskEnd: number,
    taskDate: Date,
    groupId: string,
    dayIndex: number,
    newTask: TaskFeildsType,
    newTasks: TasksType
  ) => void;
  /** Handler function for ending the drag of a task. */
  handleDragTaskEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
  /** Custom render function for the groups header. */
  groupsHeadRender?: () => React.ReactNode;
  /** Custom render function for the sum of hours. */
  sumHoursRender?: ({
    groupId,
    tasks,
    weekOffset,
    calendarDate,
    sumHoursByGroups,
  }: {
    groupId: string;
    tasks: TasksType;
    weekOffset: number;
    calendarDate: Date;
    sumHoursByGroups: number;
  }) => React.ReactNode;
  /** Custom render function for the sum of hours header. */
  sumHoursHeadRender?: () => React.ReactNode;
  /** Handler function for clicking a task. */
  handleClickTask?: (currentTask: TaskFeildsType) => void;
  /** Handler function for clicking a group. */
  handleClickGroup?: (currentGroup: GroupFeildsType) => void;
};

/**
 * Type for style props.
 */
export type StyleType = React.CSSProperties | undefined;

/**
 * Props for the AddTask component.
 */
export type AddTaskPropsType = {
  /** The current group data. */
  currentGroup: GroupFeildsType;
  /** Additional styles for the add task button. */
  addTaskStyle?: StyleType;
  /** Additional class names for the add task button. */
  addTaskClassName?: string;
  /** Custom render function for adding a task. */
  addTaskRender?: ({
    currentGroup,
    dayInfo,
  }: {
    currentGroup: GroupFeildsType;
    dayInfo: dayInfoType;
  }) => React.ReactNode;
  /** Information about the day. */
  dayInfo: dayInfoType;
  /** Handler function for adding a new task. */
  handleAddTask?: (currentGroup: GroupFeildsType, dayInfo: dayInfoType) => void;
};

/**
 * Information about a day.
 */
export type dayInfoType = {
  /** Position of the day. */
  positionDay: number;
  /** Date of the day. */
  day: Date;
  /** Start time of the day. */
  start: number;
  /** End time of the day. */
  end: number;
};

/**
 * Type for a task.
 */
export type TaskType = {
  /** Start time of the task. */
  taskStart: number;
  /** End time of the task. */
  taskEnd: number;
  /** Description of the task. */
  task: string;
  /** Date of the task. */
  taskDate: Date;
  /** ID of the group the task belongs to. */
  groupId: string;
  /** Index of the day the task belongs to. */
  dayIndex: number;
  /** Unique identifier for the task. */
  taskId: string;
   /** This is a prop to save the date in local storage until a date of your choice */
  taskExpiryDate?:Date
};

/**
 * Props for the TaskContainer component.
 */
export type TaskContainerPropsType = {
  /** Additional class names for the task container. */
  className?: string;
  /** Additional styles for the task container. */
  style?: React.CSSProperties | undefined;
  /** Handler function for dragging a task. */
  handleDragTask?: (
    event: React.DragEvent<HTMLDivElement>,
    currentTask: TaskFeildsType
  ) => void;
  /** Custom render function for a task. */
  taskRender?: ({
    currentTask,
  }: {
    currentTask: TaskFeildsType;
  }) => React.ReactNode;
  /** Handler function for ending the drag of a task. */
  handleDragTaskEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
  /** The current task data. */
  currentTask: TaskFeildsType;
  /** Handler function for clicking a task. */
  handleClickTask?: (currentTask: TaskFeildsType) => void;
};

/**
 * Props for the GroupsHeadContainer component.
 */
export type GroupsHeadContainerPropsType = {
  /** Custom render function for the groups header. */
  groupsHeadRender?: () => React.ReactNode;
  /** Additional styles for the groups header container. */
  style?: React.CSSProperties | undefined;
  /** Additional class names for the groups header container. */
  className?: string;
};

/**
 * Props for the SumHoursHeadContainer component.
 */
export type SumHoursHeadContainerPropsType = {
  /** Custom render function for the sum hours header. */
  sumHoursHeadRender?: () => React.ReactNode;
  /** Additional styles for the sum hours header container. */
  style?: React.CSSProperties | undefined;
  /** Additional class names for the sum hours header container. */
  className?: string;
};

/**
 * Additional fields for a task.
 */
type TaskAdditionalFieldsType = Record<any, any>;

/**
 * Fields for a task, including both required and additional fields.
 */
export type TaskFeildsType = TaskType & TaskAdditionalFieldsType;

/**
 * Type for an array of tasks.
 */
export type TasksType = TaskFeildsType[];

/**
 * Handler function type for ending the drag of a task.
 */
export type handleDragTaskEndType = (
  event: React.DragEvent<HTMLDivElement>
) => void;

/**
 * Props for the SumHoursContainer component.
 */
export type SumHoursContainerPropsType = {
  /** ID of the group. */
  groupId: string;
  /** Array of tasks to be displayed in the calendar. */
  tasks: TasksType;
  /** Offset for the week (e.g., -7 for last week, 0 for current week, 7 for next week). */
  weekOffset: number;
  /** The current date to display in the calendar. */
  calendarDate: Date;
  /** Sum of hours for the group. */
  sumHoursByGroups: number;
  /** Custom render function for the sum of hours. */
  sumHoursRender?: ({
    groupId,
    tasks,
    weekOffset,
    calendarDate,
    sumHoursByGroups,
  }: {
    groupId: string;
    tasks: TasksType;
    weekOffset: number;
    calendarDate: Date;
    sumHoursByGroups: number;
  }) => React.ReactNode;
  /** Additional styles for the sum hours container. */
  style?: React.CSSProperties | undefined;
  /** Additional class names for the sum hours container. */
  className?: string;
};
