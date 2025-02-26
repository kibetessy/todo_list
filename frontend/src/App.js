import React, { useEffect, useState } from "react";
import { getTasks } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container, Typography } from "@mui/material";


function App() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = () => {
    getTasks().then(setTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Todo List
      </Typography>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} refreshTasks={refreshTasks}/>
    </Container>
  );
}

export default App;
