import {useState,useEffect} from 'react';
import TaskCard from "./TaskCard";

function TaskStatusBoard(props){

    //const [statusTask,setStatusTask]=useState(null);

    useEffect(()=>{
        let url="http://localhost:8000/";
        fetch(url).then((response)=>{
            console.log(response.data);
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
                    <TaskCard title="hello"/>
                    <TaskCard title="another title"/>
                    <TaskCard title="one more title"/>
                </div>
            </div>
        </div>
    )
}

export default TaskStatusBoard;