// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Driver from "../models/driver";
// Global Config
export const driversRouter = express.Router();

driversRouter.use(express.json());
// ? GET all  ============================================================
driversRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const drivers = (await collections.drivers.find({}).toArray()) as unknown as Driver[];

        res.status(200).send(drivers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ? GET one  ============================================================
driversRouter.get("/:name", async (req: Request, res: Response) => {
    const name = req?.params?.name;

    try {

        const query = { name: name };
        const driver = (await collections.drivers.findOne(query)) as unknown as Driver;

        if (driver) {
            res.status(200).send(driver);
        }
    } catch (error) {
        res.status(404).send(`Unable to find: ${req.params.name}`);
    }
});

// ? POST one ============================================================
driversRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newDriver = req.body as Driver;

        const query = { name: newDriver.name };
        const driver = (await collections.drivers.findOne(query)) as unknown as Driver;

        if (driver) {
            res.status(409).send(`Driver already exists: ${driver.name}`);
        }
        else {
            const result = await collections.drivers.insertOne(newDriver);
            result
                ? res.status(201).send(`created new driver: ${result.insertedId}`)
                : res.status(500).send("failed to create a new driver.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// ? PUT one ============================================================
driversRouter.put("/:name", async (req: Request, res: Response) => {
    const name = req?.params?.name;

    try {
        const updatedDriver: Driver = req.body as Driver;
        const query = { name: name };

        const result = await collections.drivers.updateOne(query, { $set: updatedDriver });

        result
            ? res.status(200).send(`successfully updated driver: ${name}`)
            : res.status(304).send(`driver: ${name} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// ? DELETE one ============================================================
driversRouter.delete("/:name", async (req: Request, res: Response) => {
    const name = req?.params?.name;

    try {
        const query = { name: name };
        const result = await collections.drivers.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`removed driver with id ${name}`);
        } else if (!result) {
            res.status(400).send(`failed to remove driver with id ${name}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`driver with id ${name} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});