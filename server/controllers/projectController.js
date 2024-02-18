const Project = require("../model/projectModel");

exports.createProject = (req, res) => {
  const userId = req.params.userId;
  console.log("userId ==> " + userId);

  const newProject = {
    ...req.body,
    members: [userId],
    created_by: userId,
  };
  console.log(newProject);
  let project = new Project(newProject);
  project
    .save()
    .then(() => {
      res.status(201).json({ message: "project created" });
    })
    .catch((err) => {
      res.status(500).json({ "error creating project ": err });
    });
};

exports.getProjects = (req, res) => {
  const userId = req.params.userId;
  Project.find({ members: { $in: [userId] } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ "error creating project ": err });
    });
};

exports.getProjectByProjectId = (req, res) => {
  const projectId = req.params.projectId;
  Project.findOne({ _id: projectId })
    .populate("members", "username")
    .populate("created_by", "username")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ "error creating project ": err });
    });
};

exports.addMember = (req, res) => {
  const projectId = req.params.projectId;
  const { userId } = req.body;
  Project.updateOne({ _id: projectId }, { $addToSet: { members: userId } })
    .then(() => {
      res.status(201).json({ message: "member added in project" });
    })
    .catch((err) => {
      res.status(500).json({ "error adding member to project  ": err });
    });
};
