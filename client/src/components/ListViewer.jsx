import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/listviewer.css";
import { useNavigate } from "react-router-dom";

export const ListViewer = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [filter, setFilter] = useState("All"); // New filter state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const toggleTaskDetails = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/task/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };


  const filteredTasks = tasks.filter((task) =>
    filter === "Done"
      ? task.isCompleted
      : filter === "All" || task.priority === filter
  );

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleRedirect_AddNewTaskbtn = () => {
    navigate("/add-new-task");
  };

  return (
    <div className="list-viewer">
      <h1>Task List Viewer</h1>
      <div className="add-new-task">
        <button id="add-task-btn" onClick={handleRedirect_AddNewTaskbtn}>
          Add new task
        </button>
      </div>
      <div className="priority">
        <button
          id="all-btn"
          className={filter === "All" ? "active" : ""}
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          id="high-btn"
          className={filter === "High" ? "active" : ""}
          onClick={() => handleFilterChange("High")}
        >
          High
        </button>
        <button
          id="medium-btn"
          className={filter === "Medium" ? "active" : ""}
          onClick={() => handleFilterChange("Medium")}
        >
          Medium
        </button>
        <button
          id="low-btn"
          className={filter === "Low" ? "active" : ""}
          onClick={() => handleFilterChange("Low")}
        >
          Low
        </button>
        <button
          id="done-btn"
          className={filter === "Done" ? "active" : ""}
          onClick={() => handleFilterChange("Done")}
        >
          Done
        </button>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div className="task-item" key={task._id}>
            <div className="task-header">
              <button
                className={`arrow-btn ${
                  expandedTaskId === task._id ? "open" : ""
                }`}
                onClick={() => toggleTaskDetails(task._id)}
              >
                ▼
              </button>
              <span className="task-title">{task.taskName}</span>
              <span className="task-due-date">
                Due Date: {new Date(task.dueDate).toDateString()}
              </span>
              <span className={`priority-label ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>
            {expandedTaskId === task._id && (
              <div className="task-details">
                <p>
                  <strong>Description:</strong> {task.description}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.dueDate).toLocaleString()}
                </p>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditTask(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
