import { useState } from "react";
import TaskDashboard from "../component/TaskDashboard";
import CreateTask from "../component/CreateTask";

function ProjectDashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openCreateTask = () => {
    setIsTaskModalOpen(true);
  };

  const closeCreateTask = () => {
    setIsTaskModalOpen(false);
    window.location.reload();
  };
  return (
    <>
      <div className="createTaskButton" onClick={openCreateTask}>
        Create Task
      </div>
      <TaskDashboard />
      {isTaskModalOpen ? <CreateTask close={closeCreateTask} /> : null}
    </>
  );
}

export default ProjectDashboard;
