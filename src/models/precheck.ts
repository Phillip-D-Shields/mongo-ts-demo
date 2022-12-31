import { ObjectId } from "mongodb";

export type Check = {
  [key: string]: boolean;
}

export type Section = {
  _id: number;
  name: string;
  checks: Check[];
}

class Precheck {
  _id: ObjectId;
  name: string;
  description: string;
  sections: Section[];
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export const electricalPrecheck = {
  title: "Electrical Precheck",
  description: "Electrical Forklift Precheck",
  sections: [
    {
      _id: 1,
      title: 'cockpit',
      checks: [
        {
          text: 'the seat is ok',
          value: false,
        },
        {
          text: 'the seat belt is ok',
          value: false,
        },
        {
          text: 'the horn is ok',
          value: false,
        },
        {
          text: 'the steering wheel is ok',
          value: false,
        },
      ],
    },
    {
      _id: 2,
      title: 'frontend',
      checks: [
        {
          text: 'the front lights are ok',
          value: false,
        },
        {
          text: 'the front windshield is ok',
          value: false,
        },
        {
          text: 'the front forks are ok',
          value: false,
        },
        {
          text: 'the front tires are ok',
          value: false,
        },
      ],
    },
    {
      _id: 3,
      title: 'backend',
      checks: [
        {
          text: 'the back lights are ok',
          value: false,
        },
        {
          text: 'the back windshield is ok',
          value: false,
        },
        {
          text: 'the back forks are ok',
          value: false,
        },
        {
          text: 'the back tires are ok',
          value: false,
        },
      ],
    },
    {
      _id: 4,
      title: 'engine',
      checks: [
        {
          text: 'the engine is ok',
          value: false,
        },
        {
          text: 'the engine oil is ok',
          value: false,
        },
        {
          text: 'the engine coolant is ok',
          value: false,
        },
        {
          text: 'the engine battery is ok',
          value: false,
        },
      ],
    },
    {
      _id: 5,
      title: 'surrounding area',
      checks: [
        {
          text: 'the surrounding area is ok',
          value: false,
        },
        {
          text: 'the surrounding area is clean',
          value: false,
        },
      ],
    },
    {
      _id: 6,
      title: 'drivers notes',
      notes: [
        { checks01: '' },
        { checks02: '' },
        { checks03: '' },
        { checks04: '' },
        { checks05: '' },
        { checks06: '' },
      ]
    },
  ],
};