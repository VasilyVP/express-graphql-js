import { Request } from 'express';
import { Messages } from './messages';
import { Users } from './users';
import { Dates } from './dates';


export const root = {
    ip: (args: any, req: Request) => req.ip,
    messages: () => Messages,
    users: () => Users,
    dates: () => Dates,
}
