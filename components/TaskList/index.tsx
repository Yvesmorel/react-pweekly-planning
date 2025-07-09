import { FixedSizeList as List } from "react-window";
import TaskContainer from "../TaskContainer";
import { TaskFeildsType } from "../../definitions";

const TaskList = ({ tasks }: { tasks: TaskFeildsType[] }) => (
  <List
    height={300} 
    itemCount={tasks.length}
    itemSize={50} 
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        <TaskContainer key={tasks[index].id} currentTask={tasks[index]} />
      </div>
    )}
  </List>
);

export default TaskList;
