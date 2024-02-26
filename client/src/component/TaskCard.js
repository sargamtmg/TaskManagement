import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faAngleUp,
  faAngleDown,
  faEllipsisVertical,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { truncatedText } from "../utilities/helper";

function TaskCard(props) {
  const deleteMenuRef = useRef(null);

  const showMenu = (event) => {
    // Prevent the default behavior of the event (in this case, following the link)
    event.preventDefault();
    if (deleteMenuRef.current) {
      deleteMenuRef.current.style.display = "block";
    }
  };

  const closeMenu = () => {
    if (deleteMenuRef.current) {
      deleteMenuRef.current.style.display = "none";
    }
  };

  const deleteTask = async (event) => {
    event.preventDefault();
    // Adding your logic for deleting the item here
    let url = `http://localhost:8000/task/${props.taskInfo._id}`;
    await fetch(url, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("deleted task sucessfully");
      })
      .catch((err) => {
        alert("error deleting task" + err);
      });
    props.fetchTask();
  };

  return (
    <div className="task_card_wrapper">
      <div className="task_card">
        <div className="menu" onMouseLeave={closeMenu}>
          <div className="dots" onClick={showMenu}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="delete_menu"
            />
          </div>
          <div ref={deleteMenuRef} className="options">
            <div className="option" onClick={deleteTask}>
              Delete
              <FontAwesomeIcon icon={faTrashCan} className="trashCan" />
            </div>
          </div>
        </div>
        <div className="task_title">
          {truncatedText(props.taskInfo.summary, 30)}
        </div>
        <div className="task_details">
          <div className="task_assign_wrapper">
            <div className="task_assign">
              {props.taskInfo?.assign_to?.username}
            </div>
          </div>
          <div className="task_priority_and_story">
            <div className="task_priority">
              {props.taskInfo.priority === "low" ? (
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="low_priority_icon"
                />
              ) : props.taskInfo.priority === "medium" ? (
                <FontAwesomeIcon
                  icon={faAngleUp}
                  className="medium_priority_icon"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faAnglesUp}
                  className="high_priority_icon"
                />
              )}
            </div>
            <div className="task_story">{props.taskInfo.story_point}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
