import { Request, RequestHandler, Response } from 'express';
import { EventModel as Event } from '../models/Event';
import { ICreateEventRequest } from '../types';

const getEvents = async ( req: Request, res: Response ) => {
    const events = await Event.find()
                            .populate('user', 'name');

    res.json({
        ok: true,
        events
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
            event: eventoGuardado
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
    const { uid } = req as ICreateEventRequest;

    try {
        
        const event = await Event.findById( id );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe',
                id
            })
        }
        
        if( event!.user.toString() !== uid.toString() ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( id, newEvent, { new: true } );

        res.json({
            ok: true,
            updatedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
}

const deleteEvent = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { uid } = req as ICreateEventRequest;

    const event = await Event.findById( id );

    if( !event ){
        return res.status(404).json({
            ok: false,
            msg: 'Evento no existe',
        })
    }

    if( event!.user.toString() !== uid.toString() ){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio para eliminar este evento'
        })
    }

    try {
        
        await Event.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'deleteEvent',
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

export {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
}