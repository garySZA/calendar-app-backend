import { Request, Response } from "express";

const login = ( req: Request, res: Response ) => {
    res.json({
        message: "Login ss"
    })
}

const register = ( req: Request, res: Response ) => {
    const { body: user } = req;
    
    res.json({
        message: "Register ss",
        user
    })
}

const renew = ( req: Request, res: Response ) => {
    res.json({
        message: "Renew ss"
    })
}

export {
    login,
    register,
    renew
}