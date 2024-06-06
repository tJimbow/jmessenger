import { MessageText } from "./MessageText";

interface MessageOptions {
    id: string;
    text: string;
    author: string;
    postedAt: Date;
}

export class Message {
    readonly id: string;
    private readonly _text: MessageText;
    readonly author: string;
    readonly postedAt: Date;

    private constructor(options: MessageOptions) {
        this.author = options.author;
        this.id = options.id;
        this._text = MessageText.of(options.text);
        this.postedAt = options.postedAt;
    }

    get text(): string {
        return this._text.value;
    }

    
    static of(options: MessageOptions): Message {
        return new Message(options);
    }
}
