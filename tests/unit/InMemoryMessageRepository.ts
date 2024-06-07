import { Message } from "../../src/domain/Message";

export class InMemoryMessageRepository {
    messages = new Map<string, Message>() ;

    async save(message: Message): Promise<void> {
        this.saveMessage(message);

        return Promise.resolve();
    }

    getById(id: string): Promise<Message> {
        return Promise.resolve(this.getMessageById(id));
    }

    getMessageById(id: string): Message {
        return this.messages.get(id)!
    }

    private saveMessage(message: Message) {
        this.messages.set(message.id, message);
    }
}