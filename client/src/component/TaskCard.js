
function TaskCard(props){
    return(
        <div className="task_card_wrapper">
            <div className="task_card">
                <div className="task_title">{props.title}</div>
                <div className="task_details">
                    <div className="task_story"></div>
                    <div className="task_priority_and_assign">
                        <div className="task_priority"></div>
                        <div className="task_assign"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard;