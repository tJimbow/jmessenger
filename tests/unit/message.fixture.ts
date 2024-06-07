import { expect } from "vitest";
import { PostMessage, MessageToPost } from "../../src/infrastructure/primary/PostMessage";
import { MessageRepository } from "../../src/domain/MessageRepository";
import { Message } from "../../src/domain/Message";
import { StubDateProvider } from "./StubDateProvider";

export const useMessageFixture = () => {
    let thrownError: Error;
    let message: Message;

    const dateProvider = new StubDateProvider();
    const messageRepository: MessageRepository = {
        save: (_message: Message) => {
            message = _message;

            return Promise.resolve();
        }
    };
    const postedMessage = new PostMessage(messageRepository, dateProvider);

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

    const thenMessageShouldBe = (expectedMessage: Message) => {
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
