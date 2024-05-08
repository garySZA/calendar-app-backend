import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields, validateJWT } from '../middlewares';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers';
import { isDate } from '../helpers';

const eventsRouter = Router();

//* Aplicando validaciones generales
eventsRouter.use( validateJWT );

eventsRouter.get('/', [
], getEvents)

eventsRouter.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validateFields
], createEvent)

eventsRouter.put('/:id', [
    check('id', 'El id no es válido').isMongoId(),    
], updateEvent)

eventsRouter.delete('/:id', [
], deleteEvent)

export {
    eventsRouter
}