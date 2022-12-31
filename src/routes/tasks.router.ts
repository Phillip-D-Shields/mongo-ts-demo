// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Task from "../models/task";
// Global Config
export const tasksRouter = express.Router();

tasksRouter.use(express.json());

// ? GET all ============================================================
tasksRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks = (await collections.tasks.find({}).toArray()) as unknown as Task[];

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ? GET one ============================================================
tasksRouter.get("/:idNumber", async (req: Request, res: Response) => {
  const idNumber = req?.params?.idNumber;

  try {
    const query = { idNumber: idNumber };
    const task = (await collections.tasks.findOne(query)) as unknown as Task;

    if (task) {
      res.status(200).send(task);
    }
  } catch (error) {
    res.status(404).send(`Unable to find: ${req.params.idNumber}`);
  }
});

// ? POST one =======================================================
tasksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newTask = req.body as Task;
    const result = await collections.tasks.insertOne(newTask);

    result
      ? res.status(201).send(`created new task: ${result.insertedId}`)
      : res.status(500).send("failed to create a new task.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// ? PUT ============================================================
tasksRouter.put("/:idNumber", async (req: Request, res: Response) => {
  const idNumber = req?.params?.idNumber;

  try {
    const updatedTask: Task = req.body as Task;
    const query = { idNumber: idNumber };

    const result = await collections.tasks.updateOne(query, { $set: updatedTask });

    result
      ? res.status(200).send(`updated task: ${idNumber}`)
      : res.status(500).send(`failed to update task: ${idNumber}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ? DELETE one ========================================================
tasksRouter.delete("/:idNumber", async (req: Request, res: Response) => {
  const idNumber = req?.params?.idNumber;

  try {
    const query = { _idNumber: idNumber };
    const result = await collections.tasks.deleteOne(query);

    result
      ? res.status(200).send(`deleted task: ${idNumber}`)
      : res.status(500).send(`failed to delete task: ${idNumber}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
