import type { MessageRepository } from "@/domain/MessageRepository";
import { Message } from "@/domain/Message";
import { MessageJson } from "./MessageJson";
import type { AxiosHttpInstance } from '@/infrastructure/primary/HttpInstance';

interface GetMessagesByAuthorParams {
    author: string;
}

export class MessageHttp implements MessageRepository {
    constructor(private readonly http: AxiosHttpInstance) {
    }
    
    async getMessagesByAuthor(author: string): Promise<Message[]> {
        return await this.http.get<MessageJson[], GetMessagesByAuthorParams>('messages', { author })
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
        await this.http.post("add-message", MessageJson.of(message));
    }
}