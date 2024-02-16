const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
  },
  comment_time: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  status: {
    type: String,
    enum: ["to_do", "development", "review", "done"],
    default: "to_do",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assign_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  story_point: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "Number is not an integer value",
    },
  },
  approved: {
    is_approved: {
      type: Boolean,
      default: false,
    },
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Task", userSchema);
