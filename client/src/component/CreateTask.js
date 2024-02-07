import React, { useState } from 'react';

function CreateTask(props) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    status:'to_be_done',
    assignTo: '',
    storyPoint: '',
    comment:'',
    approved:{
        is_approved:false,
        approved_by:''
    },
    team:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error creating task');
      }
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        priority: '',
        status:'to_be_done',
        assignTo: '',
        storyPoint: '',
        comment:'',
        approved:{
            is_approved:false,
            approved_by:''
        },
        team:''
      });
      props.close();
      alert('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Please try again.');
    }
  };

  return (
    <div className='createTaskModalWrapper'>
        <div className='createTaskModal'>
            <div className='createTaskHeading'>Create Task</div>
        <div className='closeTaskButton' onClick={props.close}>Close</div>
            <form className="taskForm" onSubmit={handleSubmit}>
                <div className='formItem'>
                    <span>Summary : </span>
                    <input type="text" id="title" name="title" value={formData.name} onChange={handleChange} required />
                </div>
                <div className='formItem'>
                    <span>Description : </span>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className='formItem'>
                    <span>Priority : </span>
                    <select id="priority" name="priority" value={formData.priority} onChange={handleChange} required>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className='formItem'>
                    <span>Status</span>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                        <option value="to_be_done">To be done</option>
                        <option value="development">Development</option>
                        <option value="review">review</option>
                        <option value="done">done</option>
                    </select>
                </div>
                <div className='formItem'>
                    <span>Assigned to</span>
                    <input type="text" id="assignTo" name="assignTo" value={formData.assignTo} onChange={handleChange}/>
                </div>
                <div className='formItem'>
                    <span>Story point</span>
                    <input type="number" id="storyPoint" name="storyPoint" value={formData.storyPoint} onChange={handleChange} />
                </div>
                <div className='formItem'>
                    <span>Comment</span>
                    <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} />
                </div>
                <button type="submit">Create Task</button>
            </form>
        </div>
    </div>
  );
}

export default CreateTask;
