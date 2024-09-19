import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/addnewtask.css";

export const AddNewTask = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName || !description || !dueDate || !priority) {
      alert("Please fill all fields");
      return;
    }
    // console.log("Task Added:", { taskName, description, dueDate, priority });
    try {
      const tasks = await axios.post("http://localhost:3001/task", {
        taskName,
        description,
        dueDate,
        priority,
      });
      setTaskName("");
      setDescription("");
      setDueDate("");
      setPriority("");

      navigate("/");

      console.log("Task Added:", tasks.data);
    } catch (error) {
      console.log("There is a error: ", error);
    }
  };

  const handleCancel = () => {
    setTaskName("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  return (
    <>
      <div className="add-new-task-container">
        <div className="heading-and-deleteBtn">
          <h1>Add New Task</h1>
        </div>
        <div className="form">
          <form name="add-task-form" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task Title"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="input-field"
            />
            <br />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea-field"
            />
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-field"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input-field"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="action-buttons">
              <button className="add-task-btn" type="submit">
                Add Task
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
