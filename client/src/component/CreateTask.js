import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function CreateTask(props) {
  //const [assignee,setAssignee] = useState(props.currentUser?.username);
  const [currentUser, setCurrentUser] = useState();
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    priority: "high",
    status: "to_do",
    assign_to: currentUser?._id,
    story_point: 0,
    comment: [],
    approved: {
      is_approved: false,
    },
    project: props.projectId,
  });

  const [description, setDescription] = useState("");
  const summary_input = useRef(null);

  const priorityList = ["low", "medium", "high"];

  useEffect(() => {
    if (summary_input.current) {
      summary_input.current.focus();
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        alert("error fetching error : " + err);
      });
  }, []);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      description: description,
      assign_to: currentUser?._id,
    }));
  }, [description, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (content, delta, source, editor) => {
    if (source === "user") {
      setDescription(content);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data: " + JSON.stringify(formData));
    let url = `${process.env.REACT_APP_API_BASE_URL}/task`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error creating task");
      }
      // Reset form after successful submission
      setFormData({
        summary: "",
        description: "",
        priority: "",
        status: "to_do",
        assign_to: currentUser?._id,
        storyPoint: "",
        comments: [],
        approved: {
          is_approved: false,
        },
        project: props.projectId,
      });
      props.close();
      console.log("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task : " + error);
    }
  };

  return (
    <div className="createTaskModalWrapper">
      <div className="createTaskModal">
        <div className="createTaskHeading">
          <div className="headingwrapper">
            <div className="heading">Create Task</div>
            <div className="closeTaskButton" onClick={props.close}>
              <FontAwesomeIcon icon={faClose} className="close_icon" />
            </div>
          </div>
        </div>
        <div className="taskFormWrapper">
          <form className="taskForm" onSubmit={handleSubmit}>
            <div className="formItemProject">
              <div className="title">Project</div>
              <input className="projectTitle" value={props.projectTitle} />
            </div>
            <div className="formItemSummary">
              <div className="title">Summary : </div>
              <input
                type="text"
                className="inputForm"
                ref={summary_input}
                id="summary_input"
                name="summary"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formItemDescription">
              <div className="title">Description : </div>
              <ReactQuill
                id="description"
                className="inputForm"
                theme="snow"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="formItemPriority">
              <div className="title">Priority : </div>
              <select
                className="inputForm"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                {priorityList?.map((priorityItem, index) => {
                  return (
                    <option value={priorityItem} key={index}>
                      {priorityItem}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="formItemStatus">
              <div className="title">Status</div>
              <select
                className="inputForm"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="to_do">To be done</option>
                <option value="development">Development</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="formItemAssign">
              <div className="title">Assigned to : </div>
              <select
                className="inputForm"
                name="assign_to"
                value={formData.assign_to}
                onChange={handleChange}
              >
                {props.projectMembers?.map((member, index) => {
                  return (
                    <option key={index} value={member._id}>
                      {member.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="formItemStory">
              <div className="title">Story point</div>
              <input
                className="inputForm"
                type="number"
                id="storyPoint"
                name="story_point"
                value={formData.story_point}
                onChange={handleChange}
              />
            </div>
            <button className="submitButton" type="submit">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
