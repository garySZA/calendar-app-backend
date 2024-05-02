import { ObjectId } from 'bson';
import { Request } from 'express';

export interface IDecodedToken {
    uid: ObjectId,
    name: string
}

export interface IRenewRequest extends Request {
    uid: ObjectId,
    name: string
}

export interface ICreateEventRequest extends Request {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    uid: ObjectId;
}

export interface IEvent  {
    title: string;
    notes?: string;
    start: Date;
    end: Date;
    user: ObjectId;
}