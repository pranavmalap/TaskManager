import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/edittask.css";

export const EditTask = () => {
  const { id } = useParams(); // Get task ID from the route params
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/task/${id}`);
        const task = res.data;
        setTaskName(task.taskName);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setPriority(task.priority);
        setIsCompleted(task.isCompleted);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/task/${id}`, {
        taskName,
        description,
        dueDate,
        priority,
        isCompleted,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleMarkAsDone = async () => {
    try {
      await axios.put(`http://localhost:3001/task/${id}`, {
        isCompleted: true, // Set task as completed
      });
      console.log("Task marked as done!");
      navigate("/");
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="edit-task-container">
      <h1>Edit Task</h1>
      <form onSubmit={handleUpdateTask}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div className="action-buttons">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleMarkAsDone}>
            Mark as Done
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
