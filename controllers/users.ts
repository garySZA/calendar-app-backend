import { Request, Response } from 'express';
import { UserModel as User } from '../models';

const getUsers = ( req: Request, resp: Response ) => {
    resp.json({
        msg: `getUsers`
    });
};

const getUser = ( req: Request, resp: Response ) => {
    const { id } = req.params;
    
    resp.json({
        msg: 'getUser',
        id
    });
};

const postUser = async ( req: Request, resp: Response ) => {
    const { body } = req;
    
    const user = new User( req.body );
    await user.save();

    resp.status(201).json({
        msg: 'postUser',
        user
    });
};

const putUser = ( req: Request, resp: Response ) => {
    const { id } = req.params;
    const { body } = req;
    
    resp.json({
        msg: 'putUser',
        body
    });
};

const deleteUser = ( req: Request, resp: Response ) => {
    const { id } = req.params;
    
    resp.json({
        msg: 'deleteUser',
        id
    });
};

export {
    deleteUser,
    getUser,
    getUsers,
    postUser,
    putUser,
}