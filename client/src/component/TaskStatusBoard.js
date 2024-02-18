import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

function TaskStatusBoard(props) {
  const [statusTask, setStatusTask] = useState(null);

  useEffect(() => {
    console.log("userID : " + props.userId);
    console.log("projectId : " + props.projectId);
    console.log("status : " + props.status);
    let userIdQuery = props.userIdaaa ? `&userId=${props.userId}` : "";
    let projectIdQuery = props.projectId ? `&projectId=${props.projectId}` : "";
    let statusQuery = props.userId ? `&status=${props.status}` : "";
    let url = `http://localhost:8000/task?${userIdQuery}${projectIdQuery}${statusQuery}`;
    console.log(url);
    fetch(url)
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
  }, []);

  return (
    <div className="status_section">
      <div className="status_board">
        <div className="status_title">{props.status}</div>
        <div className="status_body">
          {statusTask
            ? statusTask.map((taskitem, index) => {
                return (
                  <Link to={`/task/${taskitem._id}`} className="task_link">
                    <TaskCard key={index} taskInfo={taskitem} />
                  </Link>
                );
              })
            : 0}
        </div>
      </div>
    </div>
  );
}

export default TaskStatusBoard;
