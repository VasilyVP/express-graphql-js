import { Request, Response, NextFunction } from 'express';
import DataLoader, { BatchLoadFn } from 'dataloader';
import { User } from '../resolvers/users';
//import { Message } from '../resolvers/messages';


export type DataLoaders = {
    dataLoaders: typeof dataLoaders;
}

type RequestWithDataLoaders = Request & DataLoaders;

const dataLoaders = {
    userLoader: new DataLoader<number, Partial<User> | Error>((keys) => User.getUsersBatch(keys)),
    //messageLoader: new DataLoader<number, Message | Error>((keys) => Message.getUsersBatch(keys)),
}

export function createDataLoaders(req: Request, res: Response, next: NextFunction) {
    (req as RequestWithDataLoaders).dataLoaders = dataLoaders;
    
    next();
}
