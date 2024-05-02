import { Request, RequestHandler, Response } from 'express';
import { EventModel as Event } from '../models/Event';
import { ICreateEventRequest } from '../types';

const getEvents = async ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        msg: 'getEvents'
    })
}

const createEvent: RequestHandler = async ( req: Request, res: Response ) => {
    const { uid } = req as ICreateEventRequest;
    const event = new Event(req.body);

    try {
        event.user = uid;
        const eventoGuardado = await event.save();

        res.json({
            ok: true,
            msg: 'createEvent',
            eventoGuardado
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }

}

const updateEvent = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'updateEvent',
        id
    })
}

const deleteEvent = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'deleteEvent',
        id
    })
}


export {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
}