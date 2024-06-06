import type { MessageRepository } from "@/domain/MessageRepository";
import { Message } from "../../domain/Message";

export interface MessageToPost {
    id: string;
    author: string;
    text: string;
}

export interface DateProvider {
    getNow(): Date;
}

export class PostMessage {
    constructor(private readonly messageRepository: MessageRepository, private readonly dateProvider: DateProvider) { }

    handle(messageToPost: MessageToPost){
        this.messageRepository.save(Message.of({
            id: messageToPost.id,
            text: messageToPost.text,
            author: messageToPost.author,
            postedAt: this.dateProvider.getNow()
        }));
    }
}
