import { Request, Response } from 'express';

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

const postUser = ( req: Request, resp: Response ) => {
    const { body } = req;
    
    resp.json({
        msg: 'postUser',
        body
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