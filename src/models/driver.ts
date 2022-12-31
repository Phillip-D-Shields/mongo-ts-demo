// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Driver {
    constructor(
        public name: string,
        public pin: number,
        public id?: ObjectId
    ) { }
}
