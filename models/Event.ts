import { Schema, model } from 'mongoose';
import { IEvent } from '../types';

interface IEventDocument extends IEvent, Document {
    toJSON(): any;
}

const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: true
    },

    notes: {
        type: String
    },

    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true,
});

EventSchema.methods.toJSON = function () {
    const { __v, _id, ...event } = this.toObject();
    event.id = _id;
    return event;
}

export const EventModel = model( 'Event', EventSchema );