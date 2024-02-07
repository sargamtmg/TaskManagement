import TaskStatusBoard from "./TaskStatusBoard";

const status = ['to_be_done','development','review','done'];
function TaskDashboard(){
    return(
        <div className="taskboard">
            {
                status.map((item,index)=>{
                    return(
                        <TaskStatusBoard status={item} key={index}/>
                    )
                })
            }
             
        </div>
    )
}

export default TaskDashboard;