import { Request, Response } from "express";
import StatusLogger from '../utils/statusLogger';
import { UserDto } from '../types/users';
import usersService from "../services/usersService";
import { ApiError } from "../errors/ApiError";

async function signup(req: Request<UserDto>, res: Response){
    const userDto = req.body;

    const newUser = await usersService.createOne(userDto)
    StatusLogger.created('users', newUser.id);
    res.status(201).json({ msg: 'User successfully created', newUser})
}

async function login(req: Request, res: Response){
    const {email, password} = req.body
    const login = await usersService.login(email, password)

    if(!login.status){
        throw ApiError.badRequest("Bad credentials")
    }
    res.status(200).json({message: login.message, accessToken: login.accessToken})
}

export default{
    signup,
    login,
}