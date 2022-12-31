import express from "express";
import { connectToDatabase } from "./services/database.service"
import { driversRouter } from "./routes/drivers.router";
import { forkliftsRouter } from "./routes/forklifts.router";
import { tasksRouter } from "./routes/tasks.router";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/drivers", driversRouter);
        app.use('/forklifts', forkliftsRouter);
        app.use('/tasks', tasksRouter)

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });