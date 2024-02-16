import ProgressBar from "@ramonak/react-progress-bar";
import { formatDate } from "../utilities/helper";

function ProjectCard(props) {
  const deadlineString = props.projectInfo.deadline;
  const deadline = new Date(deadlineString);
  return (
    <div className="projectcard_wrapper">
      <div className="projectcard">
        <div className="projectcard_title">{props.projectInfo.title}</div>
        <div className="projectcard_deadline">
          Deadline: {formatDate(deadline)}
        </div>
        <div className="projectcard_progress">
          <p className="progress_text">Progress : 60%</p>
          <ProgressBar
            completed={60}
            baseBgColor="#ccc"
            isLabelVisible={false}
            bgColor="#000"
            height="5px"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
