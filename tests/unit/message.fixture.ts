import { expect } from "vitest";
import { PostMessage, MessageToPost } from "../../src/infrastructure/primary/PostMessage";
import { Message } from "../../src/domain/Message";
import { StubDateProvider } from "./StubDateProvider";
import { InMemoryMessageRepository } from "./InMemoryMessageRepository";

export const useMessageFixture = () => {
    let thrownError: Error;

    const dateProvider = new StubDateProvider();
    const inMemoryMessageRepository = new InMemoryMessageRepository();
    const postedMessage = new PostMessage(inMemoryMessageRepository, dateProvider);

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

    return {
        givenNowIs,
        whenUserPostAMessage,
        thenMessageShouldBe,
        thenErrorShouldBe,
    };
};

export type MessageFixture = ReturnType<typeof useMessageFixture>;
