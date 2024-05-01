import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IDecodedToken, IRenewRequest } from '../types';

const validateJWT = ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { name, uid } = jwt.verify( token, config.token.secret_jwt_seed! ) as IDecodedToken;

        ( req as IRenewRequest ).uid = uid;
        ( req as IRenewRequest ).name = name;
    } catch (error) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();
}

export {
    validateJWT,
}