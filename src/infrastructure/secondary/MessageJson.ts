import type { Message } from "@/domain/Message";

export class MessageJson {
    readonly id: string;
    readonly author: string;
    readonly text: string;
    readonly postedAt: string;

    private constructor(message: Message) { 
        this.id = message.id;
        this.author = message.author;
        this.text = message.text;
        this.postedAt = message.postedAt.toISOString();
    }

    static of(message: Message) {
        return new MessageJson(message);
    }
}