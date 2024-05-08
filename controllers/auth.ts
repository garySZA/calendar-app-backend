import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserModel as User } from '../models';
import { generateJWT } from '../helpers';
import { IRenewRequest } from '../types';

// TODO: validar que el email sea único antes de que llegue a los controladores. Aplicar en rutas
const login = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;
    
    try {

        const user = await User.findOne( { email } );

        if( !user ){
            return res.status(400).json({
                message: "El usuario no existe"
            })
        };

        const validPassword = bcrypt.compareSync( password, user.password! );

        if( !validPassword ){
            return res.status(400).json({
                message: "Password incorrecto"
            })
        };

        //* Generando JWT
        const token = await generateJWT( user._id, user.name );

        res.json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
    
}

const register = async ( req: Request, res: Response ) => {
    try {
        
        //* Creando usuario
        const user = new User( req.body );

        //* Encriptando password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( user.password!, salt );

        //* Guardando usuario en DB
        await user.save();
    
        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
}

const renew: RequestHandler = async ( req: Request, res: Response, next ) => {
    try {
        const { uid, name } = req as IRenewRequest;
        
        //* Generando JWT
        const token = await generateJWT( uid, name );
    
        res.json({
            ok: true,
            name,
            uid,
            token
        })
        
    } catch (error) {
        next( error );
    }
}

export {
    login,
    register,
    renew
}