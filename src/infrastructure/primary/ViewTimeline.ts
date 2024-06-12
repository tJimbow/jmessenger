import type { MessageRepository } from "../../domain/MessageRepository";
import type { DateProvider } from "./DateProvider";
import { TimelineMessage } from "./Timeline";
import type { Timeline } from "./Timeline";

export class ViewTimeline {
    constructor(private readonly messageRepository: MessageRepository, private readonly dateProvider: DateProvider) { }

    async handle({ author }: { author: string; }): Promise<Timeline> {
        const messageByAuthor = await this.messageRepository.getMessagesByAuthor(author);
        messageByAuthor.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

        const now = this.dateProvider.getNow();

        return messageByAuthor.map(message => TimelineMessage.fromData(message, now));
    }
}
