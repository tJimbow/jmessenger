import { expect } from "vitest";
import { PostMessage, MessageToPost } from "../../src/infrastructure/primary/PostMessage";
import { Message } from "../../src/domain/Message";
import { StubDateProvider } from "./StubDateProvider";
import { InMemoryMessageRepository } from "./InMemoryMessageRepository";
import { MessageRepository } from "../../src/domain/MessageRepository";
import { DateProvider } from "../../src/infrastructure/primary/DateProvider";
import { PublicationTime } from "./publicationTime";

type Timeline = {
    author: string,
    text: string,
    publicationTime: string
}[];

class ViewTimeline {
    constructor(private readonly messageRepository: MessageRepository, private readonly dateProvider: DateProvider) { }

    async handle({ author }: { author: string }): Promise<Timeline> {
        const messageByAuthor = await this.messageRepository.getMessagesByAuthor(author);
        messageByAuthor.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
       
        const now = this.dateProvider.getNow();

        return [{
            author: messageByAuthor[0].author,
            text: messageByAuthor[0].text,
            publicationTime: new PublicationTime({now, postedAt:messageByAuthor[0].postedAt }).value
        },{
            author: messageByAuthor[1].author,
            text: messageByAuthor[1].text,
            publicationTime: new PublicationTime({now, postedAt:messageByAuthor[1].postedAt }).value
        },
        {
            author: messageByAuthor[2].author,
            text: messageByAuthor[2].text,
            publicationTime: new PublicationTime({now, postedAt:messageByAuthor[2].postedAt }).value
        }]
    }
}

export const useMessageFixture = () => {
    let thrownError: Error;
    let timeline: Timeline;

    const dateProvider = new StubDateProvider();
    const inMemoryMessageRepository = new InMemoryMessageRepository();
    const postedMessage = new PostMessage(inMemoryMessageRepository, dateProvider);
    const viewTimeline = new ViewTimeline(inMemoryMessageRepository, dateProvider);

    const givenNowIs = (now: Date) => {
        dateProvider.now = now;
    };

    const whenUserPostAMessage = async (messageToPost: MessageToPost) => {
        try {
            await postedMessage.handle(messageToPost);
        } catch (_error) {
            thrownError = _error;
        }
    };

    const thenMessageShouldBe = async (expectedMessage: Message) => {
        const message = inMemoryMessageRepository.getMessageById(expectedMessage.id);

        expect(message).toEqual(expectedMessage);
    };

    const thenErrorShouldBe = (expectedError: new () => Error) => {
        expect(thrownError).toBeInstanceOf(expectedError);
    };

    
    const givenTheFollowingMessages = (messages: Message[])  => {
        inMemoryMessageRepository.saveMultipleMessage(messages);
    }
    
    const whenUserSeeTimeLineOf = async (author: string) => {
        timeline = await viewTimeline.handle({ author });
    }
    
    const thenUserShouldSee = (expectedTimeline: Timeline) => {
        expect(timeline).toEqual(expectedTimeline);
    }


    return {
        givenNowIs,
        givenTheFollowingMessages,
        whenUserPostAMessage,
        whenUserSeeTimeLineOf,
        thenMessageShouldBe,
        thenErrorShouldBe,
        thenUserShouldSee,
    };
};

export type MessageFixture = ReturnType<typeof useMessageFixture>;
