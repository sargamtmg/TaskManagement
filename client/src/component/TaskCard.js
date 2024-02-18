import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { truncatedText } from "../utilities/helper";

function TaskCard(props) {
  return (
    <div className="task_card_wrapper">
      <div className="task_card">
        <div className="task_title">
          {truncatedText(props.taskInfo.summary, 30)}
        </div>
        <div className="task_details">
          <div className="task_assign_wrapper">
            <div className="task_assign">
              {props.taskInfo.assign_to.username}
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
