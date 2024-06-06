interface MessageOptions {
    id: string;
    text: string;
    author: string;
    postedAt: Date;
}

export class Message {
    readonly id: string;
    readonly text: string;
    readonly author: string;
    readonly postedAt: Date;

    constructor(options: MessageOptions) {
        this.author = options.author;
        this.id = options.id;
        this.text = options.text;
        this.postedAt = options.postedAt;
    }

    
    static of(options: MessageOptions): Message {
        return new Message(options);
    }
}
