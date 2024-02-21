const Task = require("../model/taskModel");

exports.getAllTask = (req, res) => {
  const { userId, projectId, status } = req.query;
  const condition = {};
  userId ? (condition.assign_to = userId) : null;
  projectId ? (condition.project = projectId) : null;
  status ? (condition.status = status) : null;
  Task.find(condition)
    .populate("assign_to", "username")
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getTaskByTaskId = (req, res) => {
  const taskId = req.params.taskId;
  Task.findOne({ _id: taskId })
    .populate("created_by", "username")
    .populate("assign_to", "username")
    .populate("approved.approved_by", "username")
    .populate("comments.commenter", "username")
    .populate("project", "title")
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

//get progress percentage
exports.getProgress = (req, res) => {
  const projectId = req.params.projectId;
  Task.find({ project: projectId }, { status: 1 })
    .then((document) => {
      let total = 0;
      let complete = 0;
      if (!document.length) {
        res.status(200).json({ progress: 0 });
      } else {
        document.map((data) => {
          total += 3;
          if (data.status === "to_do") complete += 0;
          else if (data.status === "development") complete += 1;
          else if (data.status === "review") complete += 2;
          else if (data.status === "done") complete += 3;
        });
        res
          .status(200)
          .json({ progress: ((complete / total) * 100).toFixed(2) });
      }
    })
    .catch((err) => {
      res.status(500).json({ "error getting progress": err });
    });
};

exports.getTaskStatusNumber = (req, res) => {
  const { userId } = req.params;
  Task.find({ assign_to: userId })
    .populate("status")
    .then((documents) => {
      let all_task_num = 0;
      let todo_num = 0;
      let development_num = 0;
      let review_num = 0;
      let done_num = 0;
      documents.map((data) => {
        all_task_num++;
        if (data.status === "to_do") todo_num++;
        else if (data.status === "development") development_num++;
        else if (data.status === "review") review_num++;
        else if (data.status === "done") done_num++;
      });
      let num = {
        all_task: all_task_num,
        to_do: todo_num,
        development: development_num,
        review: review_num,
        done: done_num,
      };
      res.status(200).json(num);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
