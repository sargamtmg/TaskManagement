import TaskStatusBoard from "./TaskStatusBoard";

function TaskDashboard(props) {
  const statuses = ["to_do", "development", "review", "done"];
  return (
    <div className="taskboard">
      {statuses.map((status, index) => {
        return (
          <TaskStatusBoard
            key={index}
            userId={props.userId}
            projectId={props.projectId}
            status={status}
          />
        );
      })}
    </div>
  );
}

export default TaskDashboard;
