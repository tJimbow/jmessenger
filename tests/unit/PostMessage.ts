import { Message } from "./Message";

export interface MessageToPost {
    id: string;
    author: string;
    message: string;
}

export interface MessageRepository {
    save(message: Message): void
}


export interface DateProvider {
    getNow(): Date;
}

export class PostMessage {
    constructor(private readonly messageRepository, private readonly dateProvider: DateProvider) { }

    handle(messageToPost: MessageToPost){
        this.messageRepository.save({
            id: messageToPost.id,
            message: messageToPost.message,
            author: messageToPost.author,
            postedAt: this.dateProvider.getNow()
        });
    }
}
