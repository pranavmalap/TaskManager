const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
});

app.post("/task", async (req, res) => {
  const { taskName, description, dueDate, priority } = req.body;
  try {
    const newTask = new Task({ taskName, description, dueDate, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err });
  }
});
app.put("/task/:id/done", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isCompleted: true },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error marking task as done", error: err });
  }
});

app.delete("/task/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete task with ID:", id); // Add this line

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Failed to delete task:", error);
    res.status(500).json({ message: "Failed to delete task", error });
  }
});


app.listen(3001, () => {
  console.log("Server running on port 3001!");
});
