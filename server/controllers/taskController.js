const Task = require("../model/taskModel");

exports.getAllTask = (req, res) => {
  const { userId, projectId, status } = req.query;
  const condition = {};
  condition.assign_to = userId ? userId : "";
  condition.project = projectId ? projectId : "";
  condition.status = status ? status : "";
  Task.find(condition)
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getTaskByTaskId = (req, res) => {
  const taskId = req.params.taskId;
  Task.find({ _id: taskId })
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.createTask = (req, res) => {
  const { userId } = req.params;
  let task = new Task({
    ...req.body,
    created_by: userId,
  });
  task
    .save()
    .then(() => {
      res.status(201).json({ message: "task created sucessfully" });
    })
    .catch((err) => {
      res.status(500).json({ "error creatinng task": err });
    });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.taskId;
  Task.deleteOne({ _id: taskId })
    .then(() => {
      res.status(200).json({ message: "task deleted sucessfully" });
    })
    .catch((err) => {
      res.status(500).json({ "error deleating task ": err });
    });
};

exports.updateTask = (req, res) => {
  const taskId = req.params.taskId;
  Task.updateOne({ _id: taskId }, { $set: req.body })
    .then(() => {
      res.status(201).json({ message: "task updated sucessfully" });
    })
    .catch((err) => {
      res.status(500).json({ "error updating task ": err });
    });
};

exports.addCommentTask = (req, res) => {
  const taskId = req.params.taskId;
  const comment = req.body;
  comment.comment_time = new Date();
  Task.updateOne({ _id: taskId }, { $push: { comments: comment } })
    .then(() => {
      res.status(201).json({ message: "comment added sucessfully" });
    })
    .catch((err) => {
      res.status(500).json({ "error adding comment ": err });
    });
};
