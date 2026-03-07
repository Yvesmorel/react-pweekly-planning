## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


### Description and Use Cases

`react-weekly-planning` provides a React component for weekly planning. Easily set up and manage a weekly schedule with customizable tasks, groups and views.

## Screenshot

![Planning Screenshot](https://raw.githubusercontent.com/Yvesmorel/react-pweekly-planning/main/assets/planning-screenshot.webp)

[See the demo](https://react-weekly-planning-demo.vercel.app)

[Demo repository](https://github.com/Yvesmorel/react-weekly-planning-demo.git)

#### `weekOffset`

- **Description**: This prop sets the offset for the week being displayed in the calendar.
- **Type**: `number`
- **Use Case**: If you want to show the previous week's calendar, you can set `weekOffset` to `-7`. For the next week, set it to `7`. For the current week, set it to `0`.

  **Example**:
  ```jsx
  <Calendar weekOffset={-7} ... />
  ```

#### `groups`

- **Description**: This prop is an array of group data to be displayed in the calendar.
- **Type**: `GroupFeildsType[]`
- **Use Case**: Use this prop to display different groups in the calendar. Each group can have an id, label, image URL, and other custom fields.
The "id" field for each group is required
  **Example**:
  ```jsx
  const groups = [
    { id: '1', label: 'Group 1', imageUrl: 'url1', ... },
    { id: '2', label: 'Group 2', imageUrl: 'url2', ... }
  ];

  <Calendar groups={groups} ... />
  ```
It is possible to use either Weekoffset or Date, or even both simultaneously.
#### `date`

- **Description**: This prop sets the current date to display in the calendar.
- **Type**: `Date`
- **Use Case**: Use this prop to set the focus date of the calendar. It helps in aligning the calendar view to a specific date.

  **Example**:
  ```jsx
  const currentDate = new Date();

  <Calendar date={currentDate} ... />
  ```

#### `timeZone`

- **Description**: This prop sets the timezone to be used by the calendar for all date and time calculations.
- **Type**: `TimeZone` (e.g., `"America/New_York"`, `"Europe/Paris"`, etc.)
- **Use Case**: Use this prop to align the calendar's display and event calculations to a specific global timezone instead of relying on the user's local browser timezone. This ensures consistency across different geographical locations.

  **Example**:
  ```jsx
  <Calendar timeZone="Europe/Paris" ... />
  ```

#### `scope`

- **Description**: This prop sets the view scope of the calendar.
- **Type**: `"day" | "week"`
- **Use Case**: Use this prop to define whether the calendar should display a full week or only a single day. If omitted, it defaults to a weekly view.

  **Example**:
  ```jsx
  <Calendar scope="day" dayOffset={0} ... />
  ```

#### `dayOffset`

- **Description**: This prop specifies which day of the week to display when the scope is set to "day".
- **Type**: `0 | 1 | 2 | 3 | 4 | 5 | 6`
- **Use Case**: If `scope="day"`, use this prop to target a specific day of the week (`0` being the first day of the week, up to `6`).

  **Example**:
  ```jsx
  <Calendar scope="day" dayOffset={2} ... />
  ```

#### `tasks`

- **Description**: This prop is an array of tasks to be displayed in the calendar.
- **Type**: `TasksType`
- **Use Case**: Use this prop to manage and display tasks in the calendar. Each task should contain details such as start time, end time, description, date, group ID, and day index.
 taskId, taskStart taskEnd, task, taskDate, groupId, dayIndex
  **Example**:
  ```jsx
  const tasks = [
    { taskId: '1', taskStart:'Time in milliseconde', taskEnd:'Time in milliseconde', task: 'Task 1', taskDate: new Date(), groupId: '1', dayIndex: 0, ... }
  ];

  <Calendar tasks={tasks} ... />
  ```

- **Supplementary property** : If you want the tasks to be saved up to a date of your choice you can define the `taskExpiryDate` property. It's an idea of [Patrick Aimé](https://www.linkedin.com/in/patrick-aime?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app).

- **Example**:Here's how to create a task that will expire in a day.
```jsx
  const tasks = [
    { taskId: '1', taskStart:'Time in milliseconde', taskEnd:'Time in milliseconde', task: 'Task 1', taskDate: new Date(), groupId: '1', dayIndex: 0,taskExpiryDate:new Date(Date.now() + 86400000) ... }
  ];

  <Calendar tasks={tasks} ... />
 ```

 `taskExpiryDate` is used with `getSavedTasks()` To obtain the saved tasks.

  **Example**:
  ```jsx
  import {getSavedTasks} from "react-weekly-planning/lib/utils";
  const [tasks,setTasks]=useState([])

  useEffect(()=>{
     setTasks(getSavedTasks())
  },[])

  <Calendar tasks={tasks} ... />
  ```

---

## Full Example for Beginners

Here is a complete, minimal example showing how to set up the `Calendar` with simple groups and tasks.

```tsx
import React, { useState } from "react";
import Calendar from "react-pweekly-planning"; // Verify your exact import path based on package.json
import "react-pweekly-planning/dist/style.css"; // Ensure CSS is imported depending on your setup

const App = () => {
  const [date] = useState(new Date());
  
  // Define groups (e.g., resources, team members, or projects)
  const groups = [
    { id: "1", label: "Developer A" },
    { id: "2", label: "Developer B" }
  ];

  // Create start and end times in milliseconds
  const todayAt10 = new Date().setHours(10, 0, 0, 0);
  const todayAt12 = new Date().setHours(12, 0, 0, 0);

  // Define your tasks
  const tasks = [
    { 
      taskId: "t1", 
      groupId: "1", // Belongs to "Developer A"
      taskStart: todayAt10, 
      taskEnd: todayAt12,   
      taskDate: new Date(), 
      dayIndex: new Date().getDay(), // Matches the task's day of week
      taskSummary: "Code Review"
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Weekly Planner</h1>
      <Calendar 
        date={date}
        weekOffset={0}
        groups={groups}
        tasks={tasks}
        scope="week" // Change to "day" for daily view
      />
    </div>
  );
};

export default App;
```

---

## `CalendarPropsType`

Props for the Calendar component.


| Prop Name                    | Type                                                                                  | Description                                                                                       |
|------------------------------|---------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `weekOffset`                 | number                                                                                | Offset for the week (e.g., -7 for last week, 0 for current week, 7 for next week).                |
| `scope`                      | "day" \| "week"                                                                       | Sets the calendar view to either a full week or a single day.                                     |
| `dayOffset`                  | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6                                                       | Offset index for the day column (0 = first day of week, …, 6 = last day) when scope is "day".     |
| `groups`                     | GroupFeildsType[]                                                                     | Array of group data to be displayed in the calendar.                                              |
| `className`                  | string                                                                                | Additional class names for the calendar component.                                                |
| `style`                      | React.CSSProperties \| undefined                                                      | Additional styles for the calendar component.                                                     |
| `date`                       | Date                                                                                  | The current date to display in the calendar.                                                      |
| `timeZone`                   | TimeZone                                                                              | The timezone to use for displaying and manipulating the calendar dates.                           |
| `groupRender`                | ({ currentGroup }: { currentGroup: GroupFeildsType }) => React.ReactNode              | Custom render function for a group.                                                               |
| `dayRender`                  | ({ dayIndex, day, dayOfTheMonth, dayMonth, dayYear }: { dayIndex: number; day: string; dayOfTheMonth: number; dayMonth: string; dayYear: number; }) => React.ReactNode | Custom render function for a day.                                                                 |
| `taskRender`                 | ({ currentTask, handleDragTask }: { currentTask: TaskFeildsType}) => React.ReactNode             | Custom render function for a task. |
| `rowsStyle`                  | React.CSSProperties \| undefined                                                      | Additional styles for the rows.                                                                   |
| `rowsClassName`              | string                                                                                | Additional class names for the rows.                                                              |
| `groupsColsStyle`            | React.CSSProperties \| undefined                                                      | Additional styles for the group columns.                                                          |
| `groupsColsClassName`        | string                                                                                | Additional class names for the group columns.                                                     |
| `daysColsStyle`              | React.CSSProperties \| undefined                                                      | Additional styles for the day columns.                                                            |
| `daysColsClassName`          | string                                                                                | Additional class names for the day columns.                                                       |
| `addTaskClassName`           | string                                                                                | Additional class names for the add task button.                                                   |
| `addTaskStyle`               | React.CSSProperties \| undefined                                                      | Additional styles for the add task button.                                                        |
| `groupClassName`             | string                                                                                | Additional class names for the groups.                                                            |
| `groupStyle`                 | React.CSSProperties \| undefined                                                      | Additional styles for the groups.                                                                 |
| `dayClassName`               | string                                                                                | Additional class names for the days.                                                              |
| `dayStyle`                   | React.CSSProperties \| undefined                                                      | Additional styles for the days.                                                                   |
| `taskContainerStyle`         | React.CSSProperties \| undefined                                                      | Additional styles for the task container.                                                         |
| `taskContainerClassName`     | string                                                                                | Additional class names for the task container.                                                    |
| `groupHeadContainerStyle`    | React.CSSProperties \| undefined                                                      | Additional styles for the group head container.                                                   |
| `groupHeadContainerClassName`| string                                                                                | Additional class names for the group head container.                                              |
| `sumHoursContainerStyle`     | React.CSSProperties \| undefined                                                      | Additional styles for the sum hours container.                                                    |
| `sumHoursContainerClassName` | string                                                                                | Additional class names for the sum hours container.                                               |
| `sumHoursHeadStyle`          | React.CSSProperties \| undefined                                                      | Additional styles for the sum hours header.                                                       |
| `sumHoursHeadClassName`      | string                                                                                | Additional class names for the sum hours header.                                                  |
| `handleAddTask`              | handleAddTask?: (currentGroup: GroupFeildsType, dayInfo: dayInfoType) => void;          | Handler function for adding a new task.                                                           |
| `addTaskRender`              | addTaskRender?: ({currentGroup,dayInfo}:{currentGroup: GroupFeildsType;dayInfo: dayInfoType}) => React.ReactNode;| Custom render function for adding a task.                                                         |
| `tasks`                      | TasksType                                                                             | Array of tasks to be displayed in the calendar.                                                   |
| `handleDragTask`             | (event: React.DragEvent<HTMLDivElement>, currentTask: TaskFeildsType) => void         | Handler function for dragging a task.                                                             |
| `handleDropTask`             | (event: React.DragEvent<HTMLTableDataCellElement>, taskStart: number, taskEnd: number, taskDate: Date, groupId: string, dayIndex: number, newTask: TaskFeildsType, newTasks: TasksType) => void | Handler function for dropping a task.                                                             |
| `handleDragTaskEnd`          | (event: React.DragEvent<HTMLDivElement>) => void                                      | Handler function for ending the drag of a task.                                                   |
| `groupsHeadRender`           | () => React.ReactNode                                                                 | Custom render function for the groups header.                                                     |
| `sumHoursRender`             | ({ groupId, tasks, weekOffset, calendarDate, sumHoursByGroups }: { groupId: string; tasks: TasksType; weekOffset: number; calendarDate: Date; sumHoursByGroups: number; }) => React.ReactNode | Custom render function for the sum of hours.                                                      |
| `sumHoursHeadRender`         | () => React.ReactNode                                                                 | Custom render function for the sum of hours header.                                               |
| `handleClickTask`            | (currentTask: TaskFeildsType) => void                                                 | Handler function for clicking a task.                                                             |
| `handleClickGroup`           | (currentGroup: GroupFeildsType) => void                                               | Handler function for clicking a group.                                                            |
---

---

## Additional Functions

### `updateCalendarDateWithOffset`

- **Description**: Updates the calendar date based on the week offset.
- **Parameters**:
  - `offset` (number): This represents the difference in days between the current calendar date and the same date from the previous week. A shift of 7 days takes us to the following week, while a shift of -7 days takes us back to last week. `weekOffset` is different and represents the difference in days between the current date and the week we want to reach. **A shift of 14 days brings us back to the next week starting from the current date `new Date()`**.
  **The current date `new Date()` is not necessarily the one selected in the calendar**.
  - `calendarDate` (Date): The current calendar date.
- **Returns**: A new `Date` object with the updated date.

  **Example**:
  ```javascript
  const updatedDate = updateCalendarDateWithOffset(7, new Date());
  console.log(updatedDate); // Logs the date one week ahead
  ```

### `updateOffsetWithDateCalendar`

- **Description**: Calculates the week offset from a given calendar date.
- **Parameters**:
  - `calendarDate` (Date): The calendar date.
- **Returns**: The calculated week offset.

  **Example**:
  ```javascript
  import {updateOffsetWithDateCalendar} from "react-weekly-planning/lib/utils";
  const offset = updateOffsetWithDateCalendar(new Date());
  console.log(offset); // Logs the week offset for the given date
  ```

### `millisecondsToHours`

- **Description**: Converts milliseconds to a formatted hour string.
- **Parameters**:
  - `milliseconds` (number): The time duration in milliseconds.
- **Returns**: A formatted date string.

  **Example**:
  ```javascript
  import {millisecondsToHours} from "react-weekly-planning/lib/utils";
  const formattedTime = millisecondsToHours(1716905215397);
  console.log(formattedTime); // Logs the formatted time for 14h06
  ```
### `checkDuplicates`

- **Description**: Checks if a new task overlaps with any existing tasks in the schedule. This function helps prevent overlapping tasks when scheduling.
- **Parameters**:
  - `tasks` (TasksType): An array of existing tasks. Each task should have `groupId`,`taskStart` and `taskEnd` properties representing the groupId of new task, the start and end times of the task.
  - `taskStart` (number): The start time in milliseconds of the new task to be checked.
  - `taskEnd` (number): The end time in milliseconds of the new task to be checked.
  - `groupId` (string): The groupId of new task.
- **Returns**: `boolean` - Returns `true` if there is an overlap with any existing task, otherwise returns `false`.


---

