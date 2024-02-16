import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateTask(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "to_do",
    assignTo: "",
    story_point: "",
    comment: "",
    approved: {
      is_approved: false,
      approved_by: "",
    },
    team: "",
  });

  const [description, setDescription] = useState("");

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      description: description,
    }));
  }, [description]);

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
    try {
      const response = await fetch("http://localhost:8000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
        assign_to: "",
        storyPoint: "",
        comments: [],
        approved: {
          is_approved: false,
          approved_by: "",
        },
        team: "",
      });
      props.close();
      alert("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task. Please try again.");
    }
  };

  return (
    <div className="createTaskModalWrapper">
      <div className="createTaskModal">
        <div className="createTaskHeading">
          <div className="headingwrapper">
            <div className="heading">Create Task</div>
            <div className="closeTaskButton" onClick={props.close}>
              Close
            </div>
          </div>
        </div>
        <form className="taskForm" onSubmit={handleSubmit}>
          <div className="formItemSummary">
            <div className="title">Summary : </div>
            <input
              type="text"
              className="inputForm"
              id="title"
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
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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
              <option value="review">review</option>
              <option value="done">done</option>
            </select>
          </div>
          <div className="formItemAssign">
            <div className="title">Assigned to : </div>
            <input
              className="inputForm"
              type="text"
              id="assignTo"
              name="assign_to"
              value={formData.assign_o}
              onChange={handleChange}
            />
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
  );
}

export default CreateTask;
