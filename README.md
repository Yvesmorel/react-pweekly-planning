## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🚀 react-weekly-planning, a flexible and customizable package for your productivity projects.

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


---

## Full Example for Beginners

Here is a complete, minimal example showing how to set up the `Calendar` with the `CalendarTaskContextProvider`.

```tsx
import React, { useState } from "react";
import { 
  Calendar, 
  CalendarTaskContextProvider 
} from "react-pweekly-planning";

const App = () => {
  const [date] = useState(new Date());
  
  const groups = [
    { id: "1", label: "Developer A" },
    { id: "2", label: "Developer B" }
  ];

  return (
    <CalendarTaskContextProvider hashScope="week">
      <div style={{ padding: "20px" }}>
        <h1>My Weekly Planner</h1>
        <Calendar 
          date={date}
          weekOffset={0}
          groups={groups}
          scope="week"
        />
      </div>
    </CalendarTaskContextProvider>
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
| `handleDragTask`             | (event: React.DragEvent<HTMLDivElement>, currentTask: TaskFeildsType) => void         | Handler function for dragging a task.                                                             |
| `handleDropTask`             | (event: React.DragEvent<HTMLTableDataCellElement>, taskStart: number, taskEnd: number, taskDate: Date, groupId: string, dayIndex: number, newTask: TaskFeildsType, newTasks: TasksType) => void | Handler function for dropping a task.                                                             |
| `handleDragTaskEnd`          | (event: React.DragEvent<HTMLDivElement>) => void                                      | Handler function for ending the drag of a task.                                                   |
| `groupsHeadRender`           | () => React.ReactNode                                                                 | Custom render function for the groups header.                                                     |
| `sumHoursRender`             | ({ groupId, tasks, weekOffset, calendarDate, sumHoursByGroups }: { groupId: string; tasks: TasksType; weekOffset: number; calendarDate: Date; sumHoursByGroups: number; }) => React.ReactNode | Custom render function for the sum of hours.                                                      |
| `sumHoursHeadRender`         | () => React.ReactNode                                                                 | Custom render function for the sum of hours header.                                               |
| `handleClickTask`            | (currentTask: TaskFeildsType) => void                                                 | Handler function for clicking a task.                                                             |
| `handleClickGroup`           | (currentGroup: GroupFeildsType) => void                                               | Handler function for clicking a group.                                                            |

---

### ⚡ A modular approach

This package is based on a simple principle:
👉 **use only what you need.**

Each feature is independent:

* 📅 calendar
* ⏱ planning logic
* 📊 data management
* 🧩 custom extensions

Use everything… or only a part.
**The choice is yours.**

---

## Task Management (`CalendarTaskContext`)

The `CalendarTaskContext` provides a powerful way to manage tasks globally or within specific sections of your app. It handles indexing, caching, and expiration automatically.

### `CalendarTaskContextProvider`

Wrap your application (or a specific branch) with this provider to enable task management features.

| Prop | Type | Description |
|------|------|-------------|
| `hashScope` | `"week" \| "group" \| "day"` | Defines how tasks are bucketed and cached. |
| `children` | `React.ReactNode` | Your application components. |

> [!NOTE]
> The `hashScope` is **optional** for the provider and defaults to `"week"`. It is primarily used for custom calendar implementations. When using the standard `<Calendar />` component, it internally wraps itself in a provider with `hashScope="week"`, meaning you don't need to provide one unless you are building a custom UI.

### `useCalendarTaskContext()`

Use this hook within any component nested under the provider to access the task store and management methods.

#### Properties and Methods

| Name | Type | Description |
|------|------|-------------|
| `tasks` | `TasksStore` | The current state of all tasks, organized by buckets. |
| `addTask` | `(task: Task) => void` | Adds a new task. |
| `getTasks` | `(hash: string) => Task[]` | Retrieves all tasks for a given hash (e.g., a specific week key). |
| `getTask` | `(hash: string, taskId: string) => Task \| undefined` | Finds a specific task by ID. |
| `updateTask` | `(hash: string, taskId: string, updatedTask: Partial<Task>) => void` | Updates an existing task's properties. |
| `deleteTask` | `(hash: string, taskId: string) => void` | Removes a task from the store. |
| `isValidTask` | `(task: Task) => boolean` | Checks if a task object has all required fields. |
| `cleanExpiredTasks` | `() => void` | Removes all tasks that have passed their `taskExpiryDate`. |
| `cleanExpiredTasksByHash` | `(hash: string) => void` | Removes expired tasks within a specific hash bucket. |
| `hashScope` | `"week" \| "group" \| "day"` | The active hashing strategy. |

#### Example: Adding a Task

```tsx
const TaskAdder = () => {
  const { addTask } = useCalendarTaskContext();

  const handleAdd = () => {
    addTask({
      taskId: "123",
      groupId: "1",
      taskStart: Date.now(),
      taskEnd: Date.now() + 3600000,
      taskDate: new Date(),
      dayIndex: new Date().getDay(),
      taskSummary: "New Task"
    });
  };

  return <button onClick={handleAdd}>Quick Add Task</button>;
};
```

---

## Custom Calendar Implementation (Modular Design)

For advanced users who want to build their own calendar UI from scratch (without using the `<Calendar />` component), the `CalendarTaskContext` provides all the necessary state and logic. This allows you to create highly personalized designs while leveraging the library's optimized task management.

### 1. Basic Setup

To build a custom calendar, wrap your components in `CalendarTaskContextProvider` and use `useCalendarTaskContext` to access the data and methods.

```tsx
import React from 'react';
import { 
  CalendarTaskContextProvider, 
  useCalendarTaskContext,
  updateOffsetWithDateCalendar,
  getHash 
} from 'react-weekly-planning';

const MyCustomCalendar = () => {
  const { getTasks, addTask } = useCalendarTaskContext();
  const currentDate = new Date();
  
  // 1. Calculate the week offset for the desired date
  const offset = updateOffsetWithDateCalendar(currentDate);
  
  // 2. Generate the hash for the current view (e.g., 'week' scope)
  const hash = getHash(offset).week;
  
  // 3. Retrieve tasks for that hash
  const tasks = getTasks(hash);

  return (
    <div className="my-custom-design">
      <h2>My Weekly View</h2>
      {tasks.length === 0 && <p>No tasks for this week.</p>}
      {tasks.map(task => (
        <div key={task.id} className="custom-task-card">
          <h4>{task.taskSummary}</h4>
          <p>
            {new Date(task.taskStart).toLocaleTimeString()} - 
            {new Date(task.taskEnd).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
};

const App = () => (
  <CalendarTaskContextProvider hashScope="week">
    <MyCustomCalendar />
  </CalendarTaskContextProvider>
);
```

### 2. Default Behavior of `<Calendar />`

It's important to note that the main `<Calendar />` component uses the `"week"` hash scope by default. If you use the standard component, you are implicitly using this scope. Explicitly defining a `hashScope` on the `CalendarTaskContextProvider` is only necessary when you want to change how tasks are indexed or when building a fully custom UI as shown above.

### 3. Understanding Hashes and Scopes

The library uses "hashes" to bucket tasks efficiently. When calling `getTasks(hash)`, `updateTask(hash, ...)` or `deleteTask(hash, ...)`, you must provide the hash that matches your `hashScope`:

- **Scope `"week"`**: Use `getHash(offset).week`.
- **Scope `"group"`**: Use `getHash(offset, groupId).group`.
- **Scope `"day"`**: Use `getHash(offset, groupId, dayIndex).day`.

### 4. Best Practices for Custom Designs

- **Manual Rendering**: Use `getTasks(hash)` to retrieve only the tasks relevant to the current view.
- **CRUD Operations**: Use `addTask`, `updateTask`, and `deleteTask` to modify the store. The UI will re-render automatically thanks to the context.
- **Validation**: Use `isValidTask(task)` to verify if a task is expired before displaying it, or rely on `cleanExpiredTasks()` to prune the store.
- **Performance**: Accessing tasks by hash is highly optimized. Avoid looping through the entire `tasks.buckets` manually if possible.

---

### 🧠 Total flexibility

Whether you want:

* a simple planner
* a complete productivity system
* or a fully customized solution

This package allows you to:

* integrate only useful components
* easily modify behaviors
* build your own logic

👉 **No constraints. No imposed framework.**

---

### 💡 Designed for builders

This isn't just a tool.
It's a foundation.

A system you can shape, extend, and control —
to create an organization that truly reflects you.

**Because performance starts with the freedom to build.**

---

## Additional Functions

### `getCalendarDate`

- **Description**: Returns the current date.
- **Returns**: A `Date` object representing the current time.

  **Example**:
  ```javascript
  import { getCalendarDate } from "react-weekly-planning";
  const now = getCalendarDate();
  console.log(now);
  ```

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
  import {updateOffsetWithDateCalendar} from "react-weekly-planning";
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
  import {millisecondsToHours} from "react-weekly-planning";
  const formattedTime = millisecondsToHours(1716905215397);
  console.log(formattedTime); // Logs the formatted time for 14h06
  ```


### `getHash`

- **Description**: Generates a set of bucket hashes based on the offset, group, and day.
- **Parameters**:
  - `weekOffset` (number): The week offset.
  - `groupId` (string, optional): The group ID.
  - `dayIndex` (number, optional): The day index (0-6).
- **Returns**: An object containing `week`, `group`, and `day` hash strings.

  **Example**:
  ```javascript
  import { getHash } from "react-weekly-planning";
  const hashes = getHash(0, "group-1", 2);
  console.log(hashes.week);  // "0"
  console.log(hashes.group); // "0/group-1"
  console.log(hashes.day);   // "0/group-1/2"
  ```


---


