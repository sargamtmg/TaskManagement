import './App.css';
import './styles/main.scss'
import TaskDashboard from './component/TaskDashboard';
import CreateTask from './component/CreateTask';
import { useState } from 'react';

function App() {

  const [isCreatingTask,setIsCreatingTask]=useState(false);

  const openCreateTask=()=>{
    setIsCreatingTask(true);
  }

  const closeCreateTask = ()=>{
    setIsCreatingTask(false);
  }
  return (
    <>
      <div className='createTaskButton' onClick={openCreateTask}>Create Task</div>
      <TaskDashboard/>
      {isCreatingTask ? <CreateTask close={closeCreateTask}/>:null}
    </>
  );
}

export default App;
