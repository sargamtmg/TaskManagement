import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import ProjectCard from "../component/ProjectCard";
import CreateProject from "../component/CreateProject";
import UserProfile from "../component/UserProfile";
import { formatDate } from "../utilities/helper";
import { Link } from "react-router-dom";

function Home() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const currentUser = {
    _id: "65cb822a2b6cd926c674ec5d",
    username: "Sargamtmg",
    password: "$2b$10$SUrZfAWChsc1hjlY7az/vOmyZ0wzPfoU5QUWBhcdUXyoqqPJgv4Ha",
  };

  const fetchAllProject = () => {
    fetch(`http://localhost:8000/projects/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setProjectList(data);
      })
      .catch((err) => {
        alert("error fetching error : " + err);
      });
  };

  useEffect(() => {
    fetchAllProject();
  }, []);

  const openCreateTask = () => {
    setIsCreateProjectOpen(true);
  };

  const closeCreateProject = () => {
    setIsCreateProjectOpen(false);
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // const project_list = [
  //   {
  //     title: "This is my first project",
  //     deadline: "",
  //   },
  //   {
  //     title: "This is my first project",
  //     deadline: "",
  //   },
  //   {
  //     title: "This is my first project",
  //     deadline: "",
  //   },
  //   {
  //     title: "This is my first project",
  //     deadline: "",
  //   },
  //   {
  //     title: "This is my first project",
  //     deadline: "",
  //   },
  // ];
  //const project_list = [];
  const userInfo = {
    initial: "HT",
    username: "Harry Troy",
  };
  const today = new Date();
  const todayDate = `Today, ${formatDate(today)}`;
  return (
    <>
      <div className="home_wrapper">
        <Sidebar />
        <div className="home_projects_wrapper">
          <div className="home_projects">
            <UserProfile userInfo={currentUser} />
            <div className="date_wrapper">
              <div className="today_date"> {todayDate}</div>
            </div>
            <div className="home_project_heading_wrapper">
              <div className="home_project_heading">Projects</div>
              <div className="create_project_home" onClick={openCreateTask}>
                Create Project
              </div>
            </div>
            <hr className="home_horizontal"></hr>
            <div className="home_projects_section">
              {projectList.length ? (
                projectList.map((projectInfo, index) => {
                  return (
                    <div className="project_card_section" key={index}>
                      <Link
                        to={`/project/${projectInfo._id}`}
                        className="project_card_link"
                      >
                        <ProjectCard
                          projectInfo={projectInfo}
                          key={index}
                          fetchAllProject={fetchAllProject}
                        />
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="home_no_projects">
                  <p>No Projects Found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCreateProjectOpen ? (
        <CreateProject close={closeCreateProject} currentUser={currentUser} />
      ) : null}
    </>
  );
}

export default Home;
