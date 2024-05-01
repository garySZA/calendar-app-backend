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