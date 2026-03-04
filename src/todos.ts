import express from "express";
import { NextFunction, Request, Response } from "express";

let taskData: { id: number; task: string }[] = [];

const app = express();
const port = process.env.PORT ?? "3000";

const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const { task } = req.body;
  if (!task) {
    res.status(400).send("You need to add a task!!!");
    return;
  }
  next();
};

app.use(express.json());

app.post("/todos", validateTask, (req: Request, res: Response) => {
  const { task } = req.body;
  const addedTask = {
    id: taskData.length >= 1 ? taskData.length + 1 : 1,
    task,
    isCompleted: false,
  };
  taskData.push(addedTask);
  res.status(201).send(taskData);
});

app.put("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  taskData = taskData.map((task) => {
    if (String(task.id) === id) {
      return { ...task, isCompleted: true };
    } else {
      return task;
    }
  });
  res.send(taskData);
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  taskData = taskData.filter((task) => String(task.id) !== id);
  res.status(200).send(taskData);
});

app.get("/todos", (req: Request, res: Response) => {
  res.status(200).send(taskData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
