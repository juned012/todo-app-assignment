import "./index.css";
import { ClipboardList, FilePenLine, Trash2, Check } from "lucide-react";

const App = () => {
  return (
    <div className="app-container">
      <h2 className="app-title">
        <ClipboardList />
        Todo App
      </h2>
      <form className="task-form">
        <input
          className="task-input"
          name="title"
          type="text"
          placeholder="Enter your title..."
        />
        <textarea
          className="task-textarea"
          name="description"
          placeholder="Add your description"
          rows="3"
        ></textarea>
        <button type="submit" className="btn submit-btn">
          Add Task
        </button>
      </form>

      <div className="tasks-container">
        <div className="task-item">
          <div className="task-content">
            <h3 className="task-title">Task Title</h3>
            <p className="task-desc">Task description goes here...</p>
            <small className="task-date">Added on: Date</small>
          </div>
          <div className="task-buttons">
            <button className="complete-btn">
              <Check />
            </button>
            <button className="edit-btn">
              <FilePenLine />
            </button>
            <button className="delete-btn">
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
