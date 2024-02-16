import { truncatedText } from "../utilities/helper";

function Sidebar() {
  const projects = [
    {
      title:
        "this is first project. project second to design. project second to design.project second to design",
    },
    {
      title: "project second to design",
    },
    {
      title: "now lets do third project",
    },
  ];
  //   const projects = [];
  const task_number = {
    all_task: 10,
    to_do: 3,
    development: 5,
    review: 1,
    done: 1,
  };

  const application = {
    name: "TaskWise",
    tag: "Stay on track, every step of the way",
  };

  return (
    <div className="sidebar_wrapper">
      <div className="application_wrapper">
        <div className="application_name">{application.name}</div>
        <div className="application_tag">{application.tag}</div>
      </div>
      <hr className="sidebar_horizontal_bar" />
      <div className="menu">
        <div className="home_menu">HOME</div>
        <div className="menu_section">
          <div className="menu_heading">PROJECTS</div>
          {projects.length ? (
            projects.map((projectItem, index) => {
              return (
                <div className="project_item_menu item_menu" key={index}>
                  {truncatedText(projectItem.title, 70)}
                </div>
              );
            })
          ) : (
            <div className="no_project item_menu">No projects</div>
          )}
          <div className="create_menu_item item_menu">Create new project +</div>
        </div>
        <div className="menu_section">
          <div className="menu_heading">TASKS</div>
          <div className="all_task_menu item_menu">
            All task({task_number.all_task})
          </div>
          <div className="to_do_menu item_menu">to do({task_number.to_do})</div>
          <div className="development_menu item_menu">
            Development({task_number.development})
          </div>
          <div className="review_menu item_menu">
            Review({task_number.review})
          </div>
          <div className="done_menu item_menu">Done({task_number.done})</div>
          <div className="create_menu_item item_menu">Create new task +</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
