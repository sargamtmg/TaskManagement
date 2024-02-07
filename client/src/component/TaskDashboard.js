import TaskStatusBoard from "./TaskStatusBoard";

const status = ['to_do','development','review','done'];
function TaskDashboard(){
    return(
        <div className="taskboard">
            {
                status.map((s,index)=>{
                    return(
                        <TaskStatusBoard status={s} key={index}/>
                    )
                })
            }
             
        </div>
    )
}

export default TaskDashboard;