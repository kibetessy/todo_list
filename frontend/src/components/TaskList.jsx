import React from "react";
import { updateTask, deleteTask } from "../api/tasks";
import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { Delete, CheckCircle, Cancel } from "@mui/icons-material";

const priorityColors = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const TaskList = ({ tasks, refreshTasks }) => {
  const toggleComplete = async (task) => {
    try {
      await updateTask(task.id, { ...task, completed: !task.completed });
      refreshTasks(); // Re-fetch tasks to update UI
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        refreshTasks(); // Re-fetch tasks after deletion
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your Tasks
        </Typography>
        <List>
          {tasks.length === 0 ? (
            <Typography color="textSecondary">No tasks added yet.</Typography>
          ) : (
            tasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: task.completed ? "lightgray" : "white",
                    borderRadius: 1,
                    boxShadow: 1,
                    mb: 1,
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    color="success"
                    icon={<Cancel />}
                    checkedIcon={<CheckCircle />}
                  />
                  <Stack direction="column">
                    <Typography
                      sx={{
                        textDecoration: task.completed ? "line-through" : "none",
                        fontWeight: "bold",
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Due: {task.due_date || "No due date"}
                    </Typography>
                  </Stack>
                  <Chip
                    label={task.priority}
                    color={priorityColors[task.priority]}
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                  <IconButton onClick={() => removeTask(task.id)} color="error">
                    <Delete />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskList;
