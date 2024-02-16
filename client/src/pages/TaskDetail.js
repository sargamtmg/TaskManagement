import { useState, useEffect } from "react";
import Comment from "../component/Comment";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TaskDetail(props) {
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState();
  const [creater, setCreater] = useState();
  const [assignee, setAssignee] = useState();
  const [projectInfo, setProjectInfo] = useState();
  const [members, setMembers] = useState([]);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [taskInfo, setTaskInfo] = useState({
    summary: "",
    description: "",
    priority: "low",
    status: "to_do",
    created_by: "",
    assign_to: "",
    story_point: 0,
    comment: [],
    approved: {
      is_approved: false,
      approved_by: "",
    },
    project: "",
  });
  const { taskId } = useParams();
  //   const taskInfo = {
  //       summary: "Implement Dark Mode Feature",
  //       description:
  //         "As a user, I want the application to support dark mode for better readability in low-light environments. This involves updating the UI elements and color schemes across the application to align with the dark mode theme.",
  //       priority: "low",
  //       status: "to_do",
  //      created_by: "Henry",
  //       assign_to: "Emily",
  //       story_point: 3,
  //       comment: "",
  //       approved: {
  //         is_approved: false,
  //         approved_by: "",
  //       },
  //       project: "GunRose",
  //     };

  // {
  //   "_id": {
  //     "$oid": "65cdad064ab8ab4e163a70bf"
  //   },
  //   "summary": "second task for sargamtmg and project from UI",
  //   "description": "Upgrade third-party dependencies to their latest stable versions to ensure compatibility, security, and performance enhancements. This involves reviewing release notes, testing compatibility with existing codebase, and updating dependencies across the project.",
  //   "priority": "medium",
  //   "status": "to_do",
  //   "assign_to": {
  //     "$oid": "65cb822a2b6cd926c674ec5d"
  //   },
  //   "story_point": 5,
  //   "approved": {
  //     "is_approved": false
  //   },
  //   "project": {
  //     "$oid": "65ccb5a425ffaf38469704f9"
  //   },
  //   "comment": [],
  //   "__v": 0
  // }
  const getTaskInfo = () => {
    let url = "http://localhost:8000/task/" + taskId;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTaskInfo(data[0]);
        setStatus(data[0].status);
        setPriority(data[0].priority);
        setAssignee(data[0].assign_to);
      })
      .catch((err) => {
        alert("error fetching taskInfo : " + err);
      });
  };

  useEffect(() => {
    getTaskInfo();
  }, []);

  useEffect(() => {
    const fetchUserAndProject = async () => {
      if (taskInfo.summary) {
        const userlist = [taskInfo.created_by];
        console.log("userlist : " + userlist);
        console.log("taskinfo assignto id : " + taskInfo.assign_to);
        let url = `http://localhost:8000/usernames`;
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds: userlist }),
        })
          .then((response) => response.json())
          .then((data) => {
            setCreater(data.usernames[0].username);
            console.log(JSON.stringify(data));
          })
          .catch((err) => {
            alert("error getting username in task detail page : " + err);
          });

        let projectUrl = `http://localhost:8000/project/${taskInfo.project}`;
        console.log("projectid : " + taskInfo.project);
        await fetch(projectUrl)
          .then((response) => response.json())
          .then((data) => {
            setProjectInfo(data[0]);
            console.log(
              "project info from task detail:" + JSON.stringify(data[0])
            );
          })
          .catch((err) => {
            alert("error fetching projectinfo in task detail page :" + err);
          });
      }
    };
    fetchUserAndProject();
  }, [taskInfo]);

  useEffect(() => {
    if (projectInfo) {
      let url = `http://localhost:8000/usernames`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: projectInfo.members }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMembers(data.usernames);
          console.log("members in task page : " + data.usernames);
        })
        .catch((err) => {
          alert(
            "error fetching all user for add member functionality : " + err
          );
        });
    }
  }, [projectInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") setStatus(value);
    else if (name === "priority") setPriority(value);
    else if (name === "assign_to") setAssignee(value);
    console.log("name: " + name + " value : " + value);
    var updating_data = { [name]: value };
    console.log("updating_data : " + JSON.stringify(updating_data));
    fetch("http://localhost:8000/task/update/" + taskInfo._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updating_data),
    })
      .then(() => {
        alert("task updated");
      })
      .catch(() => {
        alert("error updating task");
      });

    getTaskInfo();
  };

  const handleCommentChange = (content, delta, source, editor) => {
    if (source === "user") {
      setCommentInput(content);
    }
  };

  const addComment = async () => {
    if (commentInput) {
      let userId = "65ce1823364f1cb6a74e0105";
      let url = `http://localhost:8000/task/addcomment/${taskId}`;
      let comment = {
        commenter: userId,
        comment: commentInput,
      };
      console.log("commenter : " + userId + " comment : " + commentInput);
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then(() => {
          alert("comment added");
        })
        .catch(() => {
          alert("error adding comment");
        });
      getTaskInfo();
    }
  };

  const openCommentBox = () => {
    setIsOpenCommentBox(true);
  };

  const closeCommentBox = () => {
    addComment();
    setIsOpenCommentBox(false);
    setCommentInput("");
  };

  const cancelComment = () => {
    setIsOpenCommentBox(false);
    setCommentInput("");
  };

  return (
    <div className="task_detail_wrapper">
      <div className="task_main_detail_wrapper">
        <div className="task_main_detail">
          <div className="task_project">
            {projectInfo ? projectInfo.title : ""}
          </div>
          <div className="task_summary">{taskInfo.summary}</div>
          <div className="task_created_by">
            <div className="created_by_profile"></div>
            <span className="created_by_name">
              {creater} has created this issue
            </span>
          </div>
          <div className="task_description">
            <div className="description_heading">Description</div>
            <div dangerouslySetInnerHTML={{ __html: taskInfo.description }} />
          </div>
          <hr className="horizontal_line" />
          <div className="task_comment">
            <div className="comment_heading">Comments:</div>
            {isOpenCommentBox ? (
              <div className="comment_body">
                <ReactQuill
                  id="description"
                  className="comment_box"
                  theme="snow"
                  name="comments"
                  value={commentInput}
                  onChange={handleCommentChange}
                />
                <div className="comment_buttons">
                  <div
                    className="button comment_button"
                    onClick={closeCommentBox}
                  >
                    Comment
                  </div>
                  <div className="button cancel_button" onClick={cancelComment}>
                    Cancel
                  </div>
                </div>
              </div>
            ) : (
              <input
                className="comment_input"
                placeholder="Add comment"
                onClick={openCommentBox}
              ></input>
            )}
            <div className="comment_section">
              {taskInfo.comments
                ? taskInfo.comments.map((comment, index) => {
                    return <Comment key={index} commentInfo={comment} />;
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="task_other_details">
        <div className="task_approve">
          {taskInfo.approved.is_approved ? (
            <div className="approved">
              <div className="approved_message">Approved</div>
              <div className="approved_username">
                by {taskInfo.approved.approved_by}
              </div>
            </div>
          ) : (
            <div className="not_approved">Not Approved Yet</div>
          )}
        </div>
        <div className="task_detail_section">
          <div className="task_heading">Status:</div>
          <select
            className="task_status_info task_info"
            name="status"
            value={status}
            onChange={handleChange}
          >
            <option value="to_do">To be done</option>
            <option value="development">Development</option>
            <option value="review">Reiew</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="task_detail_section">
          <div className="task_heading">Assignee:</div>
          <select
            className="task_status_info task_info"
            name="assign_to"
            value={assignee}
            onChange={handleChange}
          >
            {members.map((member, index) => {
              return (
                <option key={index} value={member._id}>
                  {member.username}
                </option>
              );
            })}
          </select>
        </div>
        <div className="task_detail_section">
          <div className="task_heading">Priority:</div>
          <select
            className="task_status_info task_info"
            name="priority"
            value={priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="task_detail_section">
          <div className="task_heading">Story point</div>
          <div className="task_story_point_info task_info">
            {taskInfo.story_point}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TaskDetail;
