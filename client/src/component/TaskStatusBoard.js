import {useState,useEffect} from 'react';
import TaskCard from "./TaskCard";

function TaskStatusBoard(props){

    const [statusTask,setStatusTask]=useState(null);

    useEffect(()=>{
        let url="http://localhost:8000/task";
        fetch(`${url}?status=${props.status}`).then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setStatusTask(data);
            console.log(data);
        })
        .catch((err)=>{
            console.log("error getting data"+err);
        })
    },[])

    return(
        <div className="status_section">
            <div className="status_board">
                <div className="status_title">{props.status}</div>
                <div className="status_body">
                    {statusTask? statusTask.map((taskitem,index)=>{
                        return(
                            <TaskCard key={index} title={taskitem.title}/>
                        )
                    }) : 0}
                </div>
            </div>
        </div>
    )
}

export default TaskStatusBoard;