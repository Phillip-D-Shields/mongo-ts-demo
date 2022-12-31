// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Forklift from "../models/forklift";
// Global Config
export const forkliftsRouter = express.Router();

forkliftsRouter.use(express.json());

// ? GET all ============================================================
forkliftsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const forklifts = (await collections.forklifts.find({}).toArray()) as unknown as Forklift[];

    res.status(200).send(forklifts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// ? GET one ============================================================
forkliftsRouter.get("/:idNumber", async (req: Request, res: Response) => {
  const idNumber = req?.params?.idNumber;

  try {

    const query = { idNumber: idNumber };
    const forklift = (await collections.forklifts.findOne(query)) as unknown as Forklift;

    if (forklift) {
      res.status(200).send(forklift);
    }
  } catch (error) {
    res.status(404).send(`Unable to find: ${req.params.idNumber}`);
  }
});

// ? POST one ========================================================
forkliftsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newForklift = req.body as Forklift;
    const result = await collections.forklifts.insertOne(newForklift);

    result
      ? res.status(201).send(`created new forklift: ${result.insertedId}`)
      : res.status(500).send("failed to create a new forklift.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// ? PUT ============================================================
forkliftsRouter.put("/:idNumber", async (req: Request, res: Response) => {
  const idNumber = req?.params?.idNumber;

  try {
    const updatedForklift: Forklift = req.body as Forklift;
    const query = { idNumber: idNumber };

    const result = await collections.forklifts.updateOne(query, { $set: updatedForklift });

    result
      ? res.status(200).send(`successfully updated forklift: ${idNumber}`)
      : res.status(500).send(`failed to update forklift: ${idNumber}`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// ? DELETE one =======================================================
forkliftsRouter.delete("/:idNumber", async (req: Request, res: Response) => {
  const idNumber = req?.params?.idNumber;

  try {
    const query = { idNumber: idNumber };
    const result = await collections.forklifts.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(200).send(`successfully deleted forklift: ${idNumber}`);
    } else if (!result) {
      res.status(500).send(`failed to delete forklift: ${idNumber}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`unable to find forklift: ${idNumber}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});