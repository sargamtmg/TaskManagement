import { useState, useEffect } from "react";
import { truncatedText } from "../utilities/helper";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const [projectList, setProjectList] = useState([]);
  const [taskNumber, setTaskNumber] = useState();

  const currentUser = {
    _id: "65cb822a2b6cd926c674ec5d",
    username: "Sargamtmg",
    password: "$2b$10$SUrZfAWChsc1hjlY7az/vOmyZ0wzPfoU5QUWBhcdUXyoqqPJgv4Ha",
  };

  const fetchAllProject = async () => {
    await fetch(`http://localhost:8000/projects/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setProjectList(data);
      })
      .catch((err) => {
        alert("error fetching error : " + err);
      });

    await fetch(`http://localhost:8000/task/getNumber/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setTaskNumber(data);
      })
      .catch((err) => {
        alert("error fetching error : " + err);
      });
  };

  useEffect(() => {
    fetchAllProject();
  }, []);
  const projects = [
    {
      title:
        "this is first project. project second to design. project second to design.project second to design",
    },
    {
      title: "project second to design",
    },
    {
      title: "now lets do third project",
    },
  ];
  //   const projects = [];
  const task_number = {
    all_task: 10,
    to_do: 3,
    development: 5,
    review: 1,
    done: 1,
  };

  const application = {
    name: "TaskWise",
    tag: "Stay on track, every step of the way",
  };

  return (
    <div className="sidebar_wrapper">
      <div className="application_wrapper">
        <div className="application_name">{application.name}</div>
        <div className="application_tag">{application.tag}</div>
      </div>
      <hr className="sidebar_horizontal_bar" />
      <div className="menu">
        <div className="home_menu">
          <Link to={`/`} className="home_link">
            HOME
          </Link>
        </div>
        {projectList && (
          <>
            <div className="menu_section">
              <div className="menu_heading">PROJECTS</div>
              {projectList?.length ? (
                projectList.map((projectItem, index) => {
                  return (
                    <Link
                      to={`/project/${projectItem._id}`}
                      className="shortcut_project_link"
                      key={index}
                    >
                      <div className="project_item_menu item_menu">
                        {truncatedText(projectItem.title, 70)}
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="no_project item_menu">No projects</div>
              )}
            </div>
            <div className="menu_section">
              <div className="menu_heading">TASKS</div>
              <div className="all_task_menu item_menu">
                All task ({taskNumber?.all_task})
              </div>
              <div className="to_do_menu item_menu">
                to do ({taskNumber?.to_do})
              </div>
              <div className="development_menu item_menu">
                Development ({taskNumber?.development})
              </div>
              <div className="review_menu item_menu">
                Review ({taskNumber?.review})
              </div>
              <div className="done_menu item_menu">
                Done ({taskNumber?.done})
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
