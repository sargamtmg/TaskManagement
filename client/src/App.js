import "./App.css";
import "./styles/main.scss";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TaskDetail from "./pages/TaskDetail";
import Home from "./pages/Home";
import ProjectDashboard from "./pages/ProjectDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";

// const taskInfo = {
//   summary: "Implement Dark Mode Feature",
//   description:
//     "As a user, I want the application to support dark mode for better readability in low-light environments. This involves updating the UI elements and color schemes across the application to align with the dark mode theme.I want the application to support dark mode for better readability in low-light environments. This involves updating the UI elements and color schemes across the application to align with the dark mode theme.",
//   priority: "low",
//   status: "to_do",
//   created_by: "Henry",
//   assign_to: "Emily",
//   story_point: 3,
//   comments: [
//     {
//       username: "Alex",
//       comment:
//         "to support dark mode for better readability in low-light environments. This involves updating the UI elements",
//     },
//     {
//       username: "Bob",
//       comment:
//         "to support dark mode for better readability in low-light environments. ",
//     },
//     {
//       username: "Max",
//       comment:
//         "to support dark mode for better readability in low-light environments. This involves updating.",
//     },
//   ],
//   approved: {
//     is_approved: true,
//     approved_by: "Henry",
//   },
//   team: "GunRose",
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProjectDashboard />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task/:taskId" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
