import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ObjectId } from 'bson';


const generateJWT = ( uid: ObjectId, name: string ) => {
    return new Promise(( resolve, reject ) => {
        const payload = {  uid, name};

        jwt.sign( payload, config.token.secret_jwt_seed!, {
            expiresIn: `${config.token.expires_in}h`
        }, ( error, token ) => {
            if( error ){
                console.log(error);
                reject( 'No se pudo generar el token' );
            }

            resolve( token );
        })
    })
}

export {
    generateJWT,
}