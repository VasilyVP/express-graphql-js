import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { join } from 'path';
import scalars from '../resolvers/scalars';


export const schema = loadSchemaSync(join(__dirname, '**/*.graphql'), {
    loaders: [new GraphQLFileLoader()]
});

type Indexed = {
    [key: string]: any;
}

// assigning scalar resolvers to the schema
Object.keys(scalars).forEach(scalar => {
    Object.assign(schema.getTypeMap()[scalar], (scalars as Indexed)[scalar]);
});
