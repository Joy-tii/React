import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // 🟢 Retrieve tasks from Local Storage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // 🟢 Save tasks to Local Storage whenever `tasks` change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.classList.add(darkMode ? "dark-mode" : "light-mode");
    document.body.classList.remove(darkMode ? "light-mode" : "dark-mode");
  }, [darkMode]);

  useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    setTasks(savedTasks);  // UI pe dikhega
  }
}, []);


  const addTask = () => {
    if (task.trim() !== "") {
      if (editIndex !== null) {
        let updatedTasks = [...tasks];
        updatedTasks[editIndex].text = task;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask("");
    }
  };

  const toggleTask = (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    let updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div>
      <div className="header">
        <h1>To-Do List</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="container">
        <div className="input-section">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <button onClick={addTask}>{editIndex !== null ? "Update" : "Add"}</button>
        </div>

        <ul>
          {tasks.map((item, index) => (
            <li key={index} className={item.completed ? "completed fade-in" : "fade-in"}>
              {editIndex === index ? (
                <input
                  className="edit-input"
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  autoFocus
                />
              ) : (
                <span onClick={() => toggleTask(index)}>{item.text}</span>
              )}
              <div>
                {editIndex === index ? (
                  <button className="update-btn" onClick={addTask}>✔️</button>
                ) : (
                  <button className="edit-btn" onClick={() => editTask(index)}>✏️</button>
                )}
                <button className="delete-btn" onClick={() => deleteTask(index)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
