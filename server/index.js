const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const connectToMongoDB = require("./db.js");
const { ObjectId } = require("mongodb");
const projectController = require("./controllers/projectController.js");
const taskController = require("./controllers/taskController.js");
const userController = require("./controllers/userController.js");
const { authenticateToken } = require("./controllers/authenticateToken.js");
const mongoose = require("mongoose");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const port = 8000;

// let db;
// // Connect to MongoDB
// connectToMongoDB()
//   .then((database) => {
//     db = database;
//     // Start the Express server
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to MongoDB:", error);
//     process.exit(1); // Exit the process if MongoDB connection fails
//   });

mongoose.connect("mongodb://localhost:27017/taskManagement");
// Connection event handlers
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

//get current user
app.get("/user", authenticateToken, userController.getUser);

//get all users
app.get("/allusers", userController.getAllUser);

//create user
app.post("/user/register", userController.createUser);

//authenticate user
app.post("/user/login", userController.login);

//log out
app.post("/user/logout", userController.logout);

//get all tasks
app.get("/task", taskController.getAllTask);

//get task by id
app.get("/task/taskInfo/:taskId", taskController.getTaskByTaskId);

//create task
app.post("/task", authenticateToken, taskController.createTask);

//delete task
app.delete("/task/:taskId", taskController.deleteTask);

//update task
app.post("/task/update/:taskId", taskController.updateTask);

//approve task
app.post(
  "/task/approve/:taskId",
  authenticateToken,
  taskController.approveTask
);

//add Comment in task
app.post(
  "/task/addcomment/:taskId",
  authenticateToken,
  taskController.addCommentTask
);

//get task number assign to user
app.get("/task/statusInfo", authenticateToken, taskController.getStatusNum);

//get progress of project
app.get("/project/progress/:projectId", taskController.getProgress);

// create project
app.post("/project", authenticateToken, projectController.createProject);

//delete project
app.delete("/project/:projectId", projectController.deleteProject);

// get projects by userId
app.get("/projects", authenticateToken, projectController.getProjects);

//get project by projectId
app.get("/project/:projectId", projectController.getProjectByProjectId);

//add member to project
app.post("/project/addmember/:projectId", projectController.addMember);
