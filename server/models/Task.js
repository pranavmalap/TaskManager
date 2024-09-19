const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
