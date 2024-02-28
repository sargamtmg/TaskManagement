import { useEffect, useRef, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { truncatedText, formatDate, fixDecimal } from "../utilities/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function ProjectCard(props) {
  const [progress, setProgress] = useState(0);
  const deleteMenuRef = useRef(null);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_BASE_URL}/project/progress/${props.projectInfo._id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.progress) {
          setProgress(fixDecimal(data.progress));
        }
      })
      .catch((err) => {
        alert("error fetching progress" + err);
      });
  }, []);

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

  const deleteItem = async (event) => {
    event.preventDefault();
    // Add your logic for deleting the item here
    let url = `${process.env.REACT_APP_API_BASE_URL}/project/${props.projectInfo._id}`;
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
        console.log("deleted project sucessfully");
      })
      .catch((err) => {
        alert("error deleting progress" + err);
      });

    props.fetchAllProject();

    console.log("Item deleted");
  };

  const deadlineString = props.projectInfo.deadline;
  const deadline = new Date(deadlineString);
  return (
    <div className="projectcard_wrapper">
      <div className="projectcard">
        <div className="menu" onMouseLeave={closeMenu}>
          <div className="dots" onClick={showMenu}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="delete_menu"
            />
          </div>
          <div ref={deleteMenuRef} className="options">
            <div className="option" onClick={deleteItem}>
              Delete
              <FontAwesomeIcon icon={faTrashCan} className="trashCan" />
            </div>
          </div>
        </div>
        <div className="projectcard_title">
          {truncatedText(props.projectInfo.title, 60)}
        </div>
        <div className="projectcard_deadline">
          Deadline: {formatDate(deadline)}
        </div>
        <div className="projectcard_progress">
          <p className="progress_text">Progress : {progress}%</p>
          <ProgressBar
            completed={progress}
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
