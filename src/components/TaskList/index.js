import { jsx as _jsx } from "react/jsx-runtime";
import TaskContainer from "../TaskContainer";
const TaskList = ({ tasks }) => (_jsx("div", { style: { height: 300, width: "100%" }, children: _jsx("div", { style: { display: "flex", flexDirection: "column" }, children: tasks.map(task => _jsx(TaskContainer, { currentTask: task }, task.id)) }) }));
export default TaskList;
