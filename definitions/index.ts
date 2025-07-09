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
type GroupAdditionalFieldsType = Record<any, any>;

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
  groupContainerClassName?: string;
  /** Additional styles for the groups. */
  groupContainerStyle?: React.CSSProperties | undefined;
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
    event: React.DragEvent<HTMLDivElement>,
    // DragEvent<HTMLTableDataCellElement>
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
  /** your timezones */
  timeZone?: TimeZone;
  /** day id */
  dayOffset?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**day columns styles */
  dayColsStyle?: React.CSSProperties | undefined;
  /**day columns className*/
  dayColsClassName?: string;
  /**hours columns className*/
  hoursColsStyle?: React.CSSProperties | undefined;
  /**hours columns className*/
  hoursColsClassName?: string;
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
  taskDescription?: string;
  /** Description of the task. */
  taskSummary?: string;
  /** Date of the task. */
  taskDate: Date;
  /** ID of the group the task belongs to. */
  groupId: string;
  /** Index of the day the task belongs to. */
  dayIndex: number;
  /** Unique identifier for the task. */
  taskId: string;
  /** This is a prop to save the date in local storage until a date of your choice */
  taskExpiryDate?: Date;
  /**task created date */
  taskCreatedAt?: Date;
  /**task location */
  taskLocation?: string;
  /**task timezone */
  taskTimzone?: string;
};

export type filterTaskType = {
  /** Start time of the task. */
  taskStart?: number;
  /** End time of the task. */
  taskEnd?: number;
  /** Description of the task. */
  taskDescription: string;
  /** Description of the task. */
  taskSummary: string;
  /** Date of the task. */
  taskDate?: Date;
  /** ID of the group the task belongs to. */
  groupId?: string;
  /** Index of the day the task belongs to. */
  dayIndex?: number;
  /** Unique identifier for the task. */
  taskId?: string;
  /** This is a prop to save the date in local storage until a date of your choice */
  taskExpiryDate?: Date;
} & TaskAdditionalFieldsType;
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
export type weekDaysType = {
  day: string;
  dayMonth: string;
  dayYear: number;
  dayOfTheMonth: number;
}[];

export type dailyHoursType = {
  positionDay: number;
  day: Date;
  start: number;
  end: number;
}[];

type AdditionalCalandarTableType = {
  weekDays: weekDaysType;
  dailyHours: dailyHoursType;
  handleDragOver: (event: React.DragEvent<HTMLTableDataCellElement>) => void;
};

export type CalendarTablePropsType = CalendarPropsType;

export type TimeZone =
  | "Africa/Abidjan"
  | "Africa/Accra"
  | "Africa/Addis_Ababa"
  | "Africa/Algiers"
  | "Africa/Asmara"
  | "Africa/Asmera"
  | "Africa/Bamako"
  | "Africa/Bangui"
  | "Africa/Banjul"
  | "Africa/Bissau"
  | "Africa/Blantyre"
  | "Africa/Brazzaville"
  | "Africa/Bujumbura"
  | "Africa/Cairo"
  | "Africa/Casablanca"
  | "Africa/Ceuta"
  | "Africa/Conakry"
  | "Africa/Dakar"
  | "Africa/Dar_es_Salaam"
  | "Africa/Djibouti"
  | "Africa/Douala"
  | "Africa/El_Aaiun"
  | "Africa/Freetown"
  | "Africa/Gaborone"
  | "Africa/Harare"
  | "Africa/Johannesburg"
  | "Africa/Juba"
  | "Africa/Kampala"
  | "Africa/Khartoum"
  | "Africa/Kigali"
  | "Africa/Kinshasa"
  | "Africa/Lagos"
  | "Africa/Libreville"
  | "Africa/Lome"
  | "Africa/Luanda"
  | "Africa/Lubumbashi"
  | "Africa/Lusaka"
  | "Africa/Malabo"
  | "Africa/Maputo"
  | "Africa/Maseru"
  | "Africa/Mbabane"
  | "Africa/Mogadishu"
  | "Africa/Monrovia"
  | "Africa/Nairobi"
  | "Africa/Ndjamena"
  | "Africa/Niamey"
  | "Africa/Nouakchott"
  | "Africa/Ouagadougou"
  | "Africa/Porto-Novo"
  | "Africa/Sao_Tome"
  | "Africa/Timbuktu"
  | "Africa/Tripoli"
  | "Africa/Tunis"
  | "Africa/Windhoek"
  | "America/Adak"
  | "America/Anchorage"
  | "America/Anguilla"
  | "America/Antigua"
  | "America/Araguaina"
  | "America/Argentina/Buenos_Aires"
  | "America/Argentina/Catamarca"
  | "America/Argentina/ComodRivadavia"
  | "America/Argentina/Cordoba"
  | "America/Argentina/Jujuy"
  | "America/Argentina/La_Rioja"
  | "America/Argentina/Mendoza"
  | "America/Argentina/Rio_Gallegos"
  | "America/Argentina/Salta"
  | "America/Argentina/San_Juan"
  | "America/Argentina/San_Luis"
  | "America/Argentina/Tucuman"
  | "America/Argentina/Ushuaia"
  | "America/Aruba"
  | "America/Asuncion"
  | "America/Atikokan"
  | "America/Atka"
  | "America/Bahia"
  | "America/Bahia_Banderas"
  | "America/Barbados"
  | "America/Belem"
  | "America/Belize"
  | "America/Blanc-Sablon"
  | "America/Boa_Vista"
  | "America/Bogota"
  | "America/Boise"
  | "America/Buenos_Aires"
  | "America/Cambridge_Bay"
  | "America/Campo_Grande"
  | "America/Cancun"
  | "America/Caracas"
  | "America/Catamarca"
  | "America/Cayenne"
  | "America/Cayman"
  | "America/Chicago"
  | "America/Chihuahua"
  | "America/Ciudad_Juarez"
  | "America/Coral_Harbour"
  | "America/Cordoba"
  | "America/Costa_Rica"
  | "America/Creston"
  | "America/Cuiaba"
  | "America/Curacao"
  | "America/Danmarkshavn"
  | "America/Dawson"
  | "America/Dawson_Creek"
  | "America/Denver"
  | "America/Detroit"
  | "America/Dominica"
  | "America/Edmonton"
  | "America/Eirunepe"
  | "America/El_Salvador"
  | "America/Ensenada"
  | "America/Fort_Nelson"
  | "America/Fort_Wayne"
  | "America/Fortaleza"
  | "America/Glace_Bay"
  | "America/Godthab"
  | "America/Goose_Bay"
  | "America/Grand_Turk"
  | "America/Grenada"
  | "America/Guadeloupe"
  | "America/Guatemala"
  | "America/Guayaquil"
  | "America/Guyana"
  | "America/Halifax"
  | "America/Havana"
  | "America/Hermosillo"
  | "America/Indiana/Indianapolis"
  | "America/Indiana/Knox"
  | "America/Indiana/Marengo"
  | "America/Indiana/Petersburg"
  | "America/Indiana/Tell_City"
  | "America/Indiana/Vevay"
  | "America/Indiana/Vincennes"
  | "America/Indiana/Winamac"
  | "America/Indianapolis"
  | "America/Inuvik"
  | "America/Iqaluit"
  | "America/Jamaica"
  | "America/Jujuy"
  | "America/Juneau"
  | "America/Kentucky/Louisville"
  | "America/Kentucky/Monticello"
  | "America/Knox_IN"
  | "America/Kralendijk"
  | "America/La_Paz"
  | "America/Lima"
  | "America/Los_Angeles"
  | "America/Louisville"
  | "America/Lower_Princes"
  | "America/Maceio"
  | "America/Managua"
  | "America/Manaus"
  | "America/Marigot"
  | "America/Martinique"
  | "America/Matamoros"
  | "America/Mazatlan"
  | "America/Mendoza"
  | "America/Menominee"
  | "America/Merida"
  | "America/Metlakatla"
  | "America/Mexico_City"
  | "America/Miquelon"
  | "America/Moncton"
  | "America/Monterrey"
  | "America/Montevideo"
  | "America/Montreal"
  | "America/Montserrat"
  | "America/Nassau"
  | "America/New_York"
  | "America/Nipigon"
  | "America/Nome"
  | "America/Noronha"
  | "America/North_Dakota/Beulah"
  | "America/North_Dakota/Center"
  | "America/North_Dakota/New_Salem"
  | "America/Nuuk"
  | "America/Ojinaga"
  | "America/Panama"
  | "America/Pangnirtung"
  | "America/Paramaribo"
  | "America/Phoenix"
  | "America/Port-au-Prince"
  | "America/Port_of_Spain"
  | "America/Porto_Acre"
  | "America/Porto_Velho"
  | "America/Puerto_Rico"
  | "America/Punta_Arenas"
  | "America/Rainy_River"
  | "America/Rankin_Inlet"
  | "America/Recife"
  | "America/Regina"
  | "America/Resolute"
  | "America/Rio_Branco"
  | "America/Rosario"
  | "America/Santa_Isabel"
  | "America/Santarem"
  | "America/Santiago"
  | "America/Santo_Domingo"
  | "America/Sao_Paulo"
  | "America/Scoresbysund"
  | "America/Shiprock"
  | "America/Sitka"
  | "America/St_Barthelemy"
  | "America/St_Johns"
  | "America/St_Kitts"
  | "America/St_Lucia"
  | "America/St_Thomas"
  | "America/St_Vincent"
  | "America/Swift_Current"
  | "America/Tegucigalpa"
  | "America/Thule"
  | "America/Thunder_Bay"
  | "America/Tijuana"
  | "America/Toronto"
  | "America/Tortola"
  | "America/Vancouver"
  | "America/Virgin"
  | "America/Whitehorse"
  | "America/Winnipeg"
  | "America/Yakutat"
  | "America/Yellowknife"
  | "Antarctica/Casey"
  | "Antarctica/Davis"
  | "Antarctica/DumontDUrville"
  | "Antarctica/Macquarie"
  | "Antarctica/Mawson"
  | "Antarctica/McMurdo"
  | "Antarctica/Palmer"
  | "Antarctica/Rothera"
  | "Antarctica/South_Pole"
  | "Antarctica/Syowa"
  | "Antarctica/Troll"
  | "Antarctica/Vostok"
  | "Arctic/Longyearbyen"
  | "Asia/Aden"
  | "Asia/Almaty"
  | "Asia/Amman"
  | "Asia/Anadyr"
  | "Asia/Aqtau"
  | "Asia/Aqtobe"
  | "Asia/Ashgabat"
  | "Asia/Ashkhabad"
  | "Asia/Atyrau"
  | "Asia/Baghdad"
  | "Asia/Bahrain"
  | "Asia/Baku"
  | "Asia/Bangkok"
  | "Asia/Barnaul"
  | "Asia/Beirut"
  | "Asia/Bishkek"
  | "Asia/Brunei"
  | "Asia/Calcutta"
  | "Asia/Chita"
  | "Asia/Choibalsan"
  | "Asia/Chongqing"
  | "Asia/Chungking"
  | "Asia/Colombo"
  | "Asia/Dacca"
  | "Asia/Damascus"
  | "Asia/Dhaka"
  | "Asia/Dili"
  | "Asia/Dubai"
  | "Asia/Dushanbe"
  | "Asia/Famagusta"
  | "Asia/Gaza"
  | "Asia/Harbin"
  | "Asia/Hebron"
  | "Asia/Ho_Chi_Minh"
  | "Asia/Hong_Kong"
  | "Asia/Hovd"
  | "Asia/Irkutsk"
  | "Asia/Istanbul"
  | "Asia/Jakarta"
  | "Asia/Jayapura"
  | "Asia/Jerusalem"
  | "Asia/Kabul"
  | "Asia/Kamchatka"
  | "Asia/Karachi"
  | "Asia/Kashgar"
  | "Asia/Kathmandu"
  | "Asia/Katmandu"
  | "Asia/Khandyga"
  | "Asia/Kolkata"
  | "Asia/Krasnoyarsk"
  | "Asia/Kuala_Lumpur"
  | "Asia/Kuching"
  | "Asia/Kuwait"
  | "Asia/Macao"
  | "Asia/Macau"
  | "Asia/Magadan"
  | "Asia/Makassar"
  | "Asia/Manila"
  | "Asia/Muscat"
  | "Asia/Nicosia"
  | "Asia/Novokuznetsk"
  | "Asia/Novosibirsk"
  | "Asia/Omsk"
  | "Asia/Oral"
  | "Asia/Phnom_Penh"
  | "Asia/Pontianak"
  | "Asia/Pyongyang"
  | "Asia/Qatar"
  | "Asia/Qostanay"
  | "Asia/Qyzylorda"
  | "Asia/Rangoon"
  | "Asia/Riyadh"
  | "Asia/Saigon"
  | "Asia/Sakhalin"
  | "Asia/Samarkand"
  | "Asia/Seoul"
  | "Asia/Shanghai"
  | "Asia/Singapore"
  | "Asia/Srednekolymsk"
  | "Asia/Taipei"
  | "Asia/Tashkent"
  | "Asia/Tbilisi"
  | "Asia/Tehran"
  | "Asia/Tel_Aviv"
  | "Asia/Thimbu"
  | "Asia/Thimphu"
  | "Asia/Tokyo"
  | "Asia/Tomsk"
  | "Asia/Ujung_Pandang"
  | "Asia/Ulaanbaatar"
  | "Asia/Ulan_Bator"
  | "Asia/Urumqi"
  | "Asia/Ust-Nera"
  | "Asia/Vientiane"
  | "Asia/Vladivostok"
  | "Asia/Yakutsk"
  | "Asia/Yangon"
  | "Asia/Yekaterinburg"
  | "Asia/Yerevan"
  | "Atlantic/Azores"
  | "Atlantic/Bermuda"
  | "Atlantic/Canary"
  | "Atlantic/Cape_Verde"
  | "Atlantic/Faeroe"
  | "Atlantic/Faroe"
  | "Atlantic/Jan_Mayen"
  | "Atlantic/Madeira"
  | "Atlantic/Reykjavik"
  | "Atlantic/South_Georgia"
  | "Atlantic/St_Helena"
  | "Atlantic/Stanley"
  | "Australia/ACT"
  | "Australia/Adelaide"
  | "Australia/Brisbane"
  | "Australia/Broken_Hill"
  | "Australia/Canberra"
  | "Australia/Currie"
  | "Australia/Darwin"
  | "Australia/Eucla"
  | "Australia/Hobart"
  | "Australia/LHI"
  | "Australia/Lindeman"
  | "Australia/Lord_Howe"
  | "Australia/Melbourne"
  | "Australia/North"
  | "Australia/NSW"
  | "Australia/Perth"
  | "Australia/Queensland"
  | "Australia/South"
  | "Australia/Sydney"
  | "Australia/Tasmania"
  | "Australia/Victoria"
  | "Australia/West"
  | "Australia/Yancowinna"
  | "Brazil/Acre"
  | "Brazil/DeNoronha"
  | "Brazil/East"
  | "Brazil/West"
  | "Canada/Atlantic"
  | "Canada/Central"
  | "Canada/Eastern"
  | "Canada/Mountain"
  | "Canada/Newfoundland"
  | "Canada/Pacific"
  | "Canada/Saskatchewan"
  | "Canada/Yukon"
  | "CET"
  | "Chile/Continental"
  | "Chile/EasterIsland"
  | "CST6CDT"
  | "Cuba"
  | "EET"
  | "Egypt"
  | "Eire"
  | "EST"
  | "EST5EDT"
  | "Etc/GMT"
  | "Etc/GMT+0"
  | "Etc/GMT+1"
  | "Etc/GMT+10"
  | "Etc/GMT+11"
  | "Etc/GMT+12"
  | "Etc/GMT+2"
  | "Etc/GMT+3"
  | "Etc/GMT+4"
  | "Etc/GMT+5"
  | "Etc/GMT+6"
  | "Etc/GMT+7"
  | "Etc/GMT+8"
  | "Etc/GMT+9"
  | "Etc/GMT-0"
  | "Etc/GMT-1"
  | "Etc/GMT-10"
  | "Etc/GMT-11"
  | "Etc/GMT-12"
  | "Etc/GMT-13"
  | "Etc/GMT-14"
  | "Etc/GMT-2"
  | "Etc/GMT-3"
  | "Etc/GMT-4"
  | "Etc/GMT-5"
  | "Etc/GMT-6"
  | "Etc/GMT-7"
  | "Etc/GMT-8"
  | "Etc/GMT-9"
  | "Etc/GMT0"
  | "Etc/Greenwich"
  | "Etc/UCT"
  | "Etc/Universal"
  | "Etc/UTC"
  | "Etc/Zulu"
  | "Europe/Amsterdam"
  | "Europe/Andorra"
  | "Europe/Astrakhan"
  | "Europe/Athens"
  | "Europe/Belfast"
  | "Europe/Belgrade"
  | "Europe/Berlin"
  | "Europe/Bratislava"
  | "Europe/Brussels"
  | "Europe/Bucharest"
  | "Europe/Budapest"
  | "Europe/Busingen"
  | "Europe/Chisinau"
  | "Europe/Copenhagen"
  | "Europe/Dublin"
  | "Europe/Gibraltar"
  | "Europe/Guernsey"
  | "Europe/Helsinki"
  | "Europe/Isle_of_Man"
  | "Europe/Istanbul"
  | "Europe/Jersey"
  | "Europe/Kaliningrad"
  | "Europe/Kiev"
  | "Europe/Kirov"
  | "Europe/Kyiv"
  | "Europe/Lisbon"
  | "Europe/Ljubljana"
  | "Europe/London"
  | "Europe/Luxembourg"
  | "Europe/Madrid"
  | "Europe/Malta"
  | "Europe/Mariehamn"
  | "Europe/Minsk"
  | "Europe/Monaco"
  | "Europe/Moscow"
  | "Europe/Nicosia"
  | "Europe/Oslo"
  | "Europe/Paris"
  | "Europe/Podgorica"
  | "Europe/Prague"
  | "Europe/Riga"
  | "Europe/Rome"
  | "Europe/Samara"
  | "Europe/San_Marino"
  | "Europe/Sarajevo"
  | "Europe/Saratov"
  | "Europe/Simferopol"
  | "Europe/Skopje"
  | "Europe/Sofia"
  | "Europe/Stockholm"
  | "Europe/Tallinn"
  | "Europe/Tirane"
  | "Europe/Tiraspol"
  | "Europe/Ulyanovsk"
  | "Europe/Uzhgorod"
  | "Europe/Vaduz"
  | "Europe/Vatican"
  | "Europe/Vienna"
  | "Europe/Vilnius"
  | "Europe/Volgograd"
  | "Europe/Warsaw"
  | "Europe/Zagreb"
  | "Europe/Zaporozhye"
  | "Europe/Zurich"
  | "Factory"
  | "GB"
  | "GB-Eire"
  | "GMT"
  | "GMT+0"
  | "GMT-0"
  | "GMT0"
  | "Greenwich"
  | "Hongkong"
  | "HST"
  | "Iceland"
  | "Indian/Antananarivo"
  | "Indian/Chagos"
  | "Indian/Christmas"
  | "Indian/Cocos"
  | "Indian/Comoro"
  | "Indian/Kerguelen"
  | "Indian/Mahe"
  | "Indian/Maldives"
  | "Indian/Mauritius"
  | "Indian/Mayotte"
  | "Indian/Reunion"
  | "Iran"
  | "Israel"
  | "Jamaica"
  | "Japan"
  | "Kwajalein"
  | "Libya"
  | "MET"
  | "Mexico/BajaNorte"
  | "Mexico/BajaSur"
  | "Mexico/General"
  | "MST"
  | "MST7MDT"
  | "Navajo"
  | "NZ"
  | "NZ-CHAT"
  | "Pacific/Apia"
  | "Pacific/Auckland"
  | "Pacific/Bougainville"
  | "Pacific/Chatham"
  | "Pacific/Chuuk"
  | "Pacific/Easter"
  | "Pacific/Efate"
  | "Pacific/Enderbury"
  | "Pacific/Fakaofo"
  | "Pacific/Fiji"
  | "Pacific/Funafuti"
  | "Pacific/Galapagos"
  | "Pacific/Gambier"
  | "Pacific/Guadalcanal"
  | "Pacific/Guam"
  | "Pacific/Honolulu"
  | "Pacific/Johnston"
  | "Pacific/Kanton"
  | "Pacific/Kiritimati"
  | "Pacific/Kosrae"
  | "Pacific/Kwajalein"
  | "Pacific/Majuro"
  | "Pacific/Marquesas"
  | "Pacific/Midway"
  | "Pacific/Nauru"
  | "Pacific/Niue"
  | "Pacific/Norfolk"
  | "Pacific/Noumea"
  | "Pacific/Pago_Pago"
  | "Pacific/Palau"
  | "Pacific/Pitcairn"
  | "Pacific/Pohnpei"
  | "Pacific/Ponape"
  | "Pacific/Port_Moresby"
  | "Pacific/Rarotonga"
  | "Pacific/Saipan"
  | "Pacific/Samoa"
  | "Pacific/Tahiti"
  | "Pacific/Tarawa"
  | "Pacific/Tongatapu"
  | "Pacific/Truk"
  | "Pacific/Wake"
  | "Pacific/Wallis"
  | "Pacific/Yap"
  | "Poland"
  | "Portugal"
  | "PRC"
  | "PST8PDT"
  | "ROC"
  | "ROK"
  | "Singapore"
  | "Turkey"
  | "UCT"
  | "Universal"
  | "US/Alaska"
  | "US/Aleutian"
  | "US/Arizona"
  | "US/Central"
  | "US/East-Indiana"
  | "US/Eastern"
  | "US/Hawaii"
  | "US/Indiana-Starke"
  | "US/Michigan"
  | "US/Mountain"
  | "US/Pacific"
  | "US/Samoa"
  | "UTC"
  | "W-SU"
  | "WET"
  | "Zulu";
