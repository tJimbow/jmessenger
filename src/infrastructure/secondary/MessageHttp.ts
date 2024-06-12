import type { MessageRepository } from "@/domain/MessageRepository";
import { Message } from "@/domain/Message";
import { MessageJson } from "./MessageJson";
import type { HttpInstance } from '@/infrastructure/primary/HttpInstance';

export class MessageHttp implements MessageRepository {
    constructor(private readonly http: HttpInstance) {
    }
    
    async getMessagesByAuthor(author: string): Promise<Message[]> {
        return await this.http.get<MessageJson[]>("http://localhost:4173/api/messages", { params: { author } })
            .then((response) => {
                return response.data.map(message => Message.of({
                    id: message.id,
                    author: message.author,
                    text: message.text,
                    postedAt: new Date(message.postedAt)
                }))
            });
    }

    async save(message: Message): Promise<void> {
        await this.http.post("http://localhost:4173/api/add-message", MessageJson.of(message));
    }
}