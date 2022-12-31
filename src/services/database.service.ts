// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

type CollectionType = null | mongoDB.Collection;

// Global Variables
export const collections: { [key: string]: CollectionType } = {};

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    console.log("Connected to database");
    

    const driversCollection: mongoDB.Collection = db.collection(process.env.DRIVERS_COLLECTION);
    const forkliftsCollection: mongoDB.Collection = db.collection(process.env.FORKLIFTS_COLLECTION);
    const tasksCollection: mongoDB.Collection = db.collection(process.env.TASKS_COLLECTION);

    collections.drivers = driversCollection;
    collections.forklifts = forkliftsCollection;
    collections.tasks = tasksCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collections: \n
        ${driversCollection ? driversCollection.collectionName : "drivers collection not found"} \n
        ${forkliftsCollection ? forkliftsCollection.collectionName : "forklifts collection not found"} \n
        ${tasksCollection ? tasksCollection.collectionName : "tasks collection not found"} \n`
        ,
    );
}
