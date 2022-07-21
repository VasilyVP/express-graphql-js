import { MessagesDb, MessageInput } from '../db';
import { Context } from '../server';
import { User } from './users';


let counterId = Object.keys(MessagesDb).length;

export class Message {
    id: number;
    content: string;
    authorId: number;

    constructor(id: number, { content, authorId }: { content: string; authorId: number }) {
        this.id = id;
        this.content = content;
        this.authorId = authorId;
    }

    author(args: unknown, ctx: Context) {
        return new User(this.authorId, ctx).getUser();
    }
}

export const Messages = {
    message({ id }: { id: number }) {
        if (!MessagesDb[id]) throw new Error('No message exists with id: ' + id);

        return new Message(id, MessagesDb[id]);
    },

    messages({ authorId }: { authorId: User['id'] }) {
        console.log('messages resolver');

        return Object
            .entries(MessagesDb)
            .filter(message => Number(message[0]) === authorId)
            .map(message => new Message(Number(message[0]), message[1]))
    },

    messageAll() {
        const messages: Message[] = [];

        for (const id in MessagesDb) {
            messages.push(new Message(Number(id), MessagesDb[Number(id)]));
        }

        return messages;
    },

    createMessage({ input }: { input: MessageInput }) {
        MessagesDb[++counterId] = {
            ...input,
            authorId: Number(input.authorId),
        };

        return new Message(counterId, MessagesDb[counterId]);
    },

    updateMessage({ id, input }: { id: number, input: MessageInput }) {
        if (!MessagesDb[id]) throw new Error('No message exists with id: ' + id);

        MessagesDb[id] = {
            ...input,
            authorId: Number(input.authorId),
        }

        return new Message(id, MessagesDb[id]);
    }
}
