export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

interface UserI {
    name: string;
    email: string;
    gender?: Gender;
    age?: number;
    registeredAt: Date;
}
export type Users = {
    [key: number]: UserI;
}

export const UsersDb: Users = {
    1: {
        name: 'Vasily',
        email: 'vasiltvp@list.ru',
        registeredAt: new Date('2022-07-17'),
        gender: Gender.MALE,
        age: 40,
    },
    2: {
        name: 'John',
        email: 'john@list.ru',
        gender: Gender.MALE,
        registeredAt: new Date('2022-06-14'),
    },
}

export interface MessageInput {
    content: string;
    authorId: string;
}

type Message = {
    content: string;
    authorId: number;
}

type Messages = {
    [key: number]: Message;
}
export const MessagesDb: Messages = {
    1: {
        content: 'Content 1',
        authorId: 1,
    },
    2: {
        content: 'Content 2',
        authorId: 2,
    }
}
