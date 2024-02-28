import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

function TaskStatusBoard(props) {
  const [statusTask, setStatusTask] = useState(null);

  const fetchTask = () => {
    console.log("projectId : " + props.projectId);
    console.log("status : " + props.status);
    let projectIdQuery = props.projectId ? `&projectId=${props.projectId}` : "";
    let statusQuery = props.userId ? `&status=${props.status}` : "";
    let url = `${process.env.REACT_APP_API_BASE_URL}/task?${projectIdQuery}${statusQuery}`;
    console.log(url);
    fetch(url, { credentials: "include" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStatusTask(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("error getting data" + err);
      });
  };

  useEffect(() => {
    fetchTask();
  }, [props.projectId]);

  return (
    <div className="status_section">
      <div className="status_board">
        <div className="status_title">{props.status}</div>
        <div className="status_body">
          {statusTask
            ? statusTask.map((taskitem, index) => {
                return (
                  <Link to={`/task/${taskitem._id}`} className="task_link">
                    <TaskCard
                      key={index}
                      taskInfo={taskitem}
                      fetchTask={fetchTask}
                    />
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default TaskStatusBoard;
