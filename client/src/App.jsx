import { useState } from "react";
import { ListViewer } from "./components/ListViewer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddNewTask } from "./components/AddNewTask";
import { EditTask } from "./components/EditTask";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListViewer />} />
        <Route path="/add-new-task" element={<AddNewTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
