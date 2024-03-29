import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import UserProfile from "../component/UserProfile";
import TaskDashboard from "../component/TaskDashboard";
import CreateTask from "../component/CreateTask";
import { useParams } from "react-router-dom";
import { truncatedText } from "../utilities/helper";

function ProjectPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projectInfo, setProjectInfo] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  //const [members, setMembers] = useState([]);
  const [allUser, setAllUser] = useState([]);

  const currentUser = {
    _id: "65cb822a2b6cd926c674ec5d",
    username: "Sargamtmg",
    password: "$2b$10$SUrZfAWChsc1hjlY7az/vOmyZ0wzPfoU5QUWBhcdUXyoqqPJgv4Ha",
  };
  const { projectId } = useParams();

  //authenticate user
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/auth-check`, {
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        console.log("authenticated false");
        setIsAuthenticated(false);
        window.location.href = "/login";
      }
      setIsAuthenticated(true);
    });
  }, []);

  const fetchingData = async () => {
    try {
      let url = `${process.env.REACT_APP_API_BASE_URL}/project/${projectId}`;
      const response1 = await fetch(url);
      const data1 = await response1.json();
      setProjectInfo(data1);
      console.log("project Info : ", data1[0]);
    } catch (error) {
      alert("Error fetching project Info: " + error);
    }

    try {
      const response2 = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/allusers`
      );
      const data2 = await response2.json();
      setAllUser(data2);
    } catch (error) {
      alert("Error fetching all users: " + error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [projectId]);

  const handleAddMember = (e) => {
    const { name, value } = e.target;
    console.log("name:" + name + " value:" + value);
    let url = `${process.env.REACT_APP_API_BASE_URL}/project/addmember/${projectId}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: value }),
    })
      .then(() => {
        console.log("Successfully added member");
        fetchingData();
      })
      .catch((err) => {
        alert("error fetching all user for add member functionality : " + err);
      });
  };

  const openCreateTask = () => {
    setIsTaskModalOpen(true);
  };

  const closeCreateTask = () => {
    setIsTaskModalOpen(false);
    window.location.reload();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="project_page_wrapper">
        <Sidebar />
        <div className="project_detail_section">
          <div className="user_profile_wrapper">
            <UserProfile userInfo={currentUser} />
          </div>
          <div className="project_details">
            <div className="project_title">
              {truncatedText(projectInfo.title, 50)}
            </div>
            <div className="project_members">
              Members:
              {projectInfo?.members?.map((member, index) => {
                return (
                  <div key={index} className="project_member">
                    {member.username}
                  </div>
                );
              })}
              <select
                className="add_member_select"
                name="userId"
                value=""
                onChange={handleAddMember}
              >
                <option value="">Add member</option>
                {allUser.length &&
                  allUser.map((user, index) => {
                    return (
                      <option key={index} value={user._id}>
                        {user.username}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="create_task_wrapper">
            <div className="create_task_button" onClick={openCreateTask}>
              Create Task
            </div>
          </div>
          <div className="taskboard_wrapper">
            <TaskDashboard userId={currentUser._id} projectId={projectId} />
          </div>
        </div>
      </div>
      {isTaskModalOpen ? (
        <CreateTask
          close={closeCreateTask}
          projectId={projectInfo?._id}
          projectTitle={projectInfo?.title}
          projectMembers={projectInfo?.members}
          currentUser={currentUser}
        />
      ) : null}
    </>
  );
}

export default ProjectPage;
