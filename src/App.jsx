import { useState, useEffect } from "react";
import "./index.css";
import {
  ClipboardList,
  FilePenLine,
  Trash2,
  Check,
  CalendarRange,
} from "lucide-react";

const App = () => {
  const [todoInput, setTodoInput] = useState("");
  const [description, setDescription] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const parsedTasks = storedTasks.map((task) => ({
      ...task,
      date: new Date(task.date),
    }));
    setAllTasks(parsedTasks);
  }, []);

  useEffect(() => {
    if (allTasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    }
  }, [allTasks]);

  const handleInputChange = (e) => setTodoInput(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.trim() || !description.trim()) return;

    if (isEditing) {
      setAllTasks(
        allTasks.map((task) =>
          task.id === editId
            ? {
                ...task,
                title: todoInput,
                description,
                date: new Date().toISOString(),
              }
            : task
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: todoInput,
        description,
        date: new Date(),
        time: new Date().toLocaleTimeString(),
        isCompleted: false,
      };
      setAllTasks([...allTasks, newTask]);
    }
    setTodoInput("");
    setDescription("");
  };

  const handleDelete = (id) => {
    const updatedTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEdit = (id) => {
    const taskToEdit = allTasks.find((task) => task.id === id);
    setTodoInput(taskToEdit.title);
    setDescription(taskToEdit.description);
    setIsEditing(true);
    setEditId(id);
  };

  const handleComplete = (id) => {
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="app-container">
      <h2 className="app-title">
        <ClipboardList />
        Todo App
      </h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          className="task-input"
          name="title"
          type="text"
          placeholder="Enter your title..."
          value={todoInput}
          onChange={handleInputChange}
        />
        <textarea
          className="task-textarea"
          name="description"
          placeholder="Add your description"
          rows="3"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <button type="submit" className="btn submit-btn">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="tasks-container">
        {allTasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.isCompleted ? "completed" : ""}`}
          >
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-desc">{task.description}</p>
              <small className="task-date">
                <CalendarRange /> Added on:{" "}
                {new Date(task.date).toLocaleDateString()} at {task.time}
              </small>
            </div>
            <div className="task-buttons">
              <button
                className="complete-btn"
                onClick={() => handleComplete(task.id)}
              >
                <Check />
              </button>
              <button className="edit-btn" onClick={() => handleEdit(task.id)}>
                <FilePenLine />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
