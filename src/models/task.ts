// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Task {
    constructor(
        public idNumber: number,
        public title: string,
        public payload: string[],
        public destination: string,
        public assignedDriver: string | null,
        public createdTime: Date,
        public completedTime: Date | null,
        public inProgress: boolean,
        public completed: boolean,
        public driverNotes: string,
        public id?: ObjectId
    ) { }
}