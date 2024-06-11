import type { MessageRepository } from "@/domain/MessageRepository";
import type { Message } from "@/domain/Message";
import { MessageJson } from "./MessageJson";
import type { HttpInstance } from '@/infrastructure/primary/HttpInstance';

export class MessageHttp implements MessageRepository {
    constructor(private readonly http: HttpInstance) {
    }
    
    getMessagesByAuthor(author: string): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }

    async save(message: Message): Promise<void> {
        await this.http.post("http://localhost:4173/api/add-message", MessageJson.of(message));
    }
}