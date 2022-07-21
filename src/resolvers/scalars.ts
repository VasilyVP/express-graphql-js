import { GraphQLScalarType, Kind } from "graphql";
import { EmailAddressResolver } from "graphql-scalars";


const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Represent DateTime value',
    serialize: (date: unknown) => {
        if (!(date instanceof Date)) throw Error('DateTime must be a Date');

        return date; // (date as Date).getTime();
    },
    parseValue: (date: unknown) => {
        if (!(new Date(date as string) instanceof Date)) throw Error('DateTime must be a Date string');

        return new Date(date as string);
    },
    parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) return new Date(ast.value);

        throw Error('DateTime must be a Date string');
    },
});

const Age = new GraphQLScalarType({
    name: 'Age',
    description: 'Age 18-120 years old',
    serialize: (val: unknown) => {
        if (typeof val !== 'number') throw Error('Age must be a Number');

        return val;
    },
    parseValue: (val: unknown) => {
        if (typeof val !== 'number') throw Error('Age must be a Number');
        if (val < 18 || val > 120) throw Error('Age must be between 18-120');

        return val;
    },
    parseLiteral: (ast) => {
        console.log('parseLiteral: ', ast);

        if (ast.kind !== Kind.INT) throw Error('Age must be a Number');
        
        const age = Number(ast.value);
        if (age < 18 || age > 120) throw Error('Age must be between 18-120');

        return Number(ast.value);
    },
});

export default {
    DateTime,
    Age,
    EmailAddress: EmailAddressResolver,
}
