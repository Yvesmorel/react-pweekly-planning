
import TaskContainer from "../TaskContainer";
import { TaskFeildsType } from "../../definitions";

const TaskList = ({ tasks }: { tasks: TaskFeildsType[] }) => (
  <div style={{ height: 300, width: "100%" }}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tasks.map(task => <TaskContainer key={task.id} currentTask={task} />)}
    </div>
  </div>
);

export default TaskList;
