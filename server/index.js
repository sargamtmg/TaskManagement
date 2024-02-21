const express = require("express");
const cors = require("cors");
const JWT = require("jsonwebtoken");
const connectToMongoDB = require("./db.js");
const { ObjectId } = require("mongodb");
const projectController = require("./controllers/projectController.js");
const taskController = require("./controllers/taskController.js");
const userController = require("./controllers/userController.js");
const mongoose = require("mongoose");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
app.use(cors(corsOptions));
const port = 8000;

app.use(express.json());

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

//get all users
app.get("/user", userController.getUsers);

//create user
app.post("/user", userController.createUser);

//authenticate user
app.post("/user/auth", userController.authenticateUser);

//get all tasks
app.get("/task", taskController.getAllTask);

//get task by id
app.get("/task/:taskId", taskController.getTaskByTaskId);

//create task
app.post("/task/:userId", taskController.createTask);

//delete task
app.delete("/task/:taskId", taskController.deleteTask);

//update task
app.post("/task/update/:taskId", taskController.updateTask);

//add Comment in task
app.post("/task/addcomment/:taskId", taskController.addCommentTask);

//get task number assign to user
app.get("/task/getNumber/:userId", taskController.getTaskStatusNumber);

//get progress of project
app.get("/project/progress/:projectId", taskController.getProgress);

// create project
app.post("/project/:userId", projectController.createProject);

//delete project
app.delete("/project/:projectId", projectController.deleteProject);

// get projects by userId
app.get("/projects/:userId", projectController.getProjects);

//get project by projectId
app.get("/project/:projectId", projectController.getProjectByProjectId);

//add member to project
app.post("/project/addmember/:projectId", projectController.addMember);
