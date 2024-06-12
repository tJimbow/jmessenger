import { Message } from "../../domain/Message";
import { PublicationTime } from "./PublicationTime";

export class TimelineMessage {
    constructor(readonly author: string, readonly text: string, readonly publicationTime: string) {}

    static fromData(message: Message, now: Date) {
        return new TimelineMessage(message.author, message.text, new PublicationTime({ now, postedAt: message.postedAt }).value);
    }
}

export type Timeline = TimelineMessage[];
