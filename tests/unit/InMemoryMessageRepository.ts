import { Message } from "../../src/domain/Message";
import { MessageRepository } from "../../src/domain/MessageRepository";

export class InMemoryMessageRepository implements MessageRepository {
    messages = new Map<string, Message>() ;

    async save(message: Message): Promise<void> {
        this.saveMessage(message);

        return Promise.resolve();
    }

    async saveMultipleMessage(messages: Message[]): Promise<void> {
        messages.forEach(message => {
            this.saveMessage(message);
        });

        return Promise.resolve();
    }

    getById(id: string): Promise<Message> {
        return Promise.resolve(this.getMessageById(id));
    }

    getMessageById(id: string): Message {
        return this.messages.get(id)!
    }

    getMessagesByAuthor(author: string): Promise<Message[]> {
        return Promise.resolve([...this.messages.values()].filter(message => message.author === author));
    }

    private saveMessage(message: Message) {
        this.messages.set(message.id, message);
    }
}