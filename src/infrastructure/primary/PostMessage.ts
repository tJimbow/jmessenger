import type { MessageRepository } from "@/domain/MessageRepository";
import { Message } from "../../domain/Message";
import type { DateProvider } from "./DateProvider";

export interface MessageToPost {
    id: string;
    author: string;
    text: string;
}

export class PostMessage {
    constructor(private readonly messageRepository: MessageRepository, private readonly dateProvider: DateProvider) { }

    async handle(messageToPost: MessageToPost){
        await this.messageRepository.save(Message.of({
            id: messageToPost.id,
            text: messageToPost.text,
            author: messageToPost.author,
            postedAt: this.dateProvider.getNow()
        }));
    }
}
