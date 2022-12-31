// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Forklift {
    constructor(
        public idNumber: number,  
        public model: string,
        public someDetail: string,
        public id?: ObjectId
    ) { }
}