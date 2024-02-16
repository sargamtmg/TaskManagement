import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CreateProject(props) {
  const [formData, setFormData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFormSubmit = () => {
    formData.deadline = startDate;
    console.log(formData);
    let url = "http://localhost:8000/project/" + props.currentUser._id;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("error => " + err);
      });
  };
  return (
    <div className="create_project_modal_wrapper">
      <div className="create_project_modal">
        <div className="project_modal_heading">
          <div className="project_modal_title">Create Project</div>
          <div className="project_modal_close" onClick={props.close}>
            Close
          </div>
        </div>
        <form className="create_project_form" onSubmit={handleFormSubmit}>
          <div className="project_title_section">
            <div className="project_title">Title</div>
            <input
              type="text"
              className="project_title_input"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="deadline_project_section">
            <div className="project_deadline_title">Deadline</div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <button type="Submit" className="project_create_submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
