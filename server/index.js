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
  origin: [
    "https://master.d235f70a0haj8w.amplifyapp.com",
    "http://taskwise.s3-website.ap-south-1.amazonaws.com",
    "http://localhost:3000",
  ],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const port = 8000;

const password = "cnxd00peFS8EzkH0";

const mongoUrl = `mongodb+srv://sargamtmg:${password}@cluster0.15dwgas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUrl);
// Connection event handlers
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

// API endpoint to check authentication
app.get("/auth-check", authenticateToken, (req, res) => {
  res.status(200).json({ message: "user authenticated" });
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
app.get("/user/logout", userController.logout);

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
