import { useState, useEffect, useRef } from "react";
import Comment from "../component/Comment";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TaskDetail(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState();
  const [assignee, setAssignee] = useState();
  const [projectInfo, setProjectInfo] = useState();
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const commentRef = useRef(null);
  const [taskInfo, setTaskInfo] = useState({
    summary: "",
    description: "",
    priority: "low",
    status: "to_do",
    created_by: "",
    assign_to: "",
    story_point: 0,
    comments: [],
    approved: {
      is_approved: false,
      approved_by: "",
    },
    project: "",
  });
  const { taskId } = useParams();

  const application = {
    name: "TaskWise",
  };

  //authenticate user
  useEffect(() => {
    fetch("http://localhost:8000/auth-check", {
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

  const getTaskInfo = () => {
    let url = "http://localhost:8000/task/taskInfo/" + taskId;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTaskInfo(data);
        setStatus(data.status);
        setPriority(data.priority);
        setAssignee(data.assign_to?._id);
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
        let projectUrl = `http://localhost:8000/project/${taskInfo?.project._id}`;
        console.log("projectid : " + taskInfo.project._id);
        await fetch(projectUrl)
          .then((response) => response.json())
          .then((data) => {
            setProjectInfo(data);
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

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "status") setStatus(value);
    else if (name === "priority") setPriority(value);
    else if (name === "assign_to") setAssignee(value);
    console.log("name: " + name + " value : " + value);
    var updating_data = { [name]: value };
    console.log("updating_data : " + JSON.stringify(updating_data));
    await fetch("http://localhost:8000/task/update/" + taskInfo._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updating_data),
    })
      .then(() => {
        console.log("task updated");
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
      let url = `http://localhost:8000/task/addcomment/${taskId}`;
      let comment = {
        comment: commentInput,
      };
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
        credentials: "include",
      })
        .then(() => {
          console.log("comment added");
        })
        .catch(() => {
          alert("error adding comment");
        });
      getTaskInfo();
    }
  };

  const openCommentBox = async () => {
    await setIsOpenCommentBox(true);
    if (commentRef.current) {
      commentRef.current.focus();
    }
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

  const approveTask = async () => {
    await fetch("http://localhost:8000/task/approve/" + taskInfo._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        console.log("task approved");
      })
      .catch(() => {
        alert("error approving task");
      });
    getTaskInfo();
  };

  const cancelApproval = async () => {
    const approvalData = {
      approved: {
        is_approved: false,
      },
    };
    await fetch("http://localhost:8000/task/update/" + taskInfo._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(approvalData),
    })
      .then(() => {
        console.log("task approval cancelled");
      })
      .catch(() => {
        alert("error cancelling approval");
      });
    getTaskInfo();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="task_detail_wrapper">
      <div className="task_main_detail_wrapper">
        <div className="application_wrapper">
          <div className="application_name">{application.name}</div>
        </div>
        <div className="task_main_detail">
          <div className="task_project">
            <span className="project_title">Project</span> :{" "}
            {taskInfo?.project?.title}
          </div>
          <div className="task_summary">{taskInfo?.summary}</div>
          <div className="task_created_by">
            <span className="created_by_name">
              <span className="username_creater">
                {taskInfo?.created_by?.username}
              </span>{" "}
              has created this issue
            </span>
          </div>
          <div className="task_description">
            <div className="description_heading">Description</div>
            <div dangerouslySetInnerHTML={{ __html: taskInfo.description }} />
          </div>
          <div className="approval_section">
            {taskInfo?.approved?.is_approved ? (
              <div
                className="cancel_approval approve_button"
                onClick={cancelApproval}
              >
                Cancel Approval
              </div>
            ) : (
              <div className="approve approve_button" onClick={approveTask}>
                Approve
              </div>
            )}
          </div>
          <hr className="horizontal_line" />
          <div className="task_comment">
            <div className="comment_heading">Comments:</div>
            {isOpenCommentBox ? (
              <div className="comment_body">
                <ReactQuill
                  id="description"
                  ref={commentRef}
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
            <div className="comment_section_wrapper">
              {taskInfo?.comments
                ? taskInfo.comments.map((comment, index) => {
                    return <Comment key={index} commentInfo={comment} />;
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="task_other_details_wrapper">
        <div className="task_other_details">
          <div className="task_approve">
            {taskInfo?.approved?.is_approved ? (
              <div className="approved">
                <div className="approved_message">
                  Approved
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="approved_check"
                  />
                </div>
                <div className="approved_username">
                  by {taskInfo?.approved?.approved_by?.username}
                </div>
              </div>
            ) : (
              <div className="not_approved">
                Not Approved{" "}
                <FontAwesomeIcon
                  icon={faExclamation}
                  className="not_approved_icon"
                />
              </div>
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
              {projectInfo?.members.map((member, index) => {
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
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="task_detail_section">
            <div className="task_heading">Story point:</div>
            <div className="task_story_point_info task_info">
              {taskInfo?.story_point}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TaskDetail;
