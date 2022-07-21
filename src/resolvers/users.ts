import { UsersDb, Gender } from '../db';
import { Messages } from './messages';
import { Context } from '../server';


export class User {
    id: number;
    name: string | null = null;
    email: string | null = null;
    gender: Gender | null = null;
    age: number | null = null;
    registeredAt: Date | null = null;
    ctx: Context;


    constructor(id: number, ctx: Context) {
        this.id = id;
        this.ctx = ctx;
    }

    async getUser({ id }: { id?: number } = {}) {
        const userId = id || this.id;

        const user = await this.ctx.dataLoaders.userLoader.load(userId);

        return (
            user instanceof Error
                ? user
                : {
                    id: this.id,
                    ...user,
                    messages: () => Messages.messages({ authorId: userId }),
                }
        )
    }

    static async getUsersBatch(keys: readonly number[]) {
        return keys.map(key => UsersDb[key] || Error('No user with id: ' + key))
    }
}

type UserInput = {
    name?: string;
    email: string;
    gender: Gender;
    age: number;
}

export const Users = {
    user({ id }: { id: number }, ctx: Context) {
        return new User(id, ctx).getUser();
    },

    users({ ids }: { ids: number[] }, ctx: Context) {
        return ids.map(id => new User(id, ctx).getUser())
    },

    createUser({ user }: { user: UserInput }, ctx: Context) {
        const id = Math.max(...Object.keys(UsersDb).map(key => Number(key))) + 1;

        const { name, email, gender, age } = user;

        UsersDb[id] = {
            name: name || '',
            email,
            gender,
            age,
            registeredAt: new Date(),
        }

        const newUser = new User(id, ctx).getUser();

        return newUser;
    },
}
