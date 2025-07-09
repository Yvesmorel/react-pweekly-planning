import { jsx as _jsx } from "react/jsx-runtime";
import { FixedSizeList as List } from "react-window";
import TaskContainer from "../TaskContainer";
const TaskList = ({ tasks }) => (_jsx(List, { height: 300, itemCount: tasks.length, itemSize: 50, width: "100%", children: ({ index, style }) => (_jsx("div", { style: style, children: _jsx(TaskContainer, { currentTask: tasks[index] }, tasks[index].id) })) }));
export default TaskList;
