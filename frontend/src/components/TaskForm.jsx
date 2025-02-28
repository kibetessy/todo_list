import React, { useState } from "react";
import { addTask } from "../api/tasks";
import { TextField, Button, MenuItem, Stack, Card, CardContent, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const priorities = ["Low", "Medium", "High"];

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await addTask({ title, completed: false, due_date: dueDate, priority });
      onTaskAdded(newTask);
      setTitle("");
      setDueDate("");
      setPriority("Medium");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (

    <Card sx={{ mb: 2, p: 2, boxShadow: 7, borderRadius: 5}}>
      <CardContent >
        <Typography variant="h6" gutterBottom>
          Add a New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" alignItems="center">
            <TextField
              label="New Task"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
            />

            <TextField
              type="date"
              label="Due Date"
              fullWidth
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              select
              label="Priority"
              fullWidth
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              variant="outlined"
            >
              {priorities.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" variant="contained" startIcon={<Add />} color="primary">
              Add Task
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
