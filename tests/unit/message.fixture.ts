import { expect } from "vitest";
import { PostMessage, MessageToPost } from "../../src/infrastructure/primary/PostMessage";
import { Message } from "../../src/domain/Message";
import { StubDateProvider } from "./StubDateProvider";
import { InMemoryMessageRepository } from "./InMemoryMessageRepository";
import { ViewTimeline } from "../../src/infrastructure/primary/ViewTimeline";
import { Timeline } from "../../src/infrastructure/primary/Timeline";

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
