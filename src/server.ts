import express, { Request/* , Response, NextFunction */ } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { root } from './resolvers/root';
import { schema } from './schema/schema';
import { createDataLoaders, DataLoaders } from './middleware/createDataLoaders';


const app = express();

/* const loggingMidddleware = (req: Request, res: Response, next: NextFunction) => {
    next();
} */

export type Context = Request & DataLoaders;

app
    .get('/', (req, res) => res.send('Hello get'))
    //.use(loggingMidddleware)
    .use('/graphql', createDataLoaders)
    .use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    }))
    .listen(3000);

console.log('Running a GraphQL API server at http://localhost:3000/graphql');
