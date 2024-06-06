import { describe, expect, it } from "vitest";
import { MessageRepository, PostMessage, DateProvider } from "./PostMessage";
import { Message } from "./Message";

describe("message", () => {
    describe("posting a message", () => {
        it("should post a message", () => {
            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: "my first message",
            });
            thenMessageShouldBe({
                id: "message-id",
                author: "Alice",
                text: "my first message",
                postedAt: new Date("2019-01-01T14:02:30.000Z")
            })
        })

        it("should not post a message with more than 280 characters", () => {
            const textWithMoreThan280Characters = "a".repeat(281);

            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: textWithMoreThan280Characters,
            });
            thenErrorShouldBe(MessageTooLongError)
        })
    });
});

let message: Message;
let dateProvider: DateProvider;
let thrownError: Error;

class MessageTooLongError extends Error {}

class StubDateProvider implements DateProvider {
    constructor(private readonly now: Date) { }

    getNow() {
        return this.now;
    }
}

const messageRepository: MessageRepository = {
    save: (_message: Message) => {
        message = _message;
    }
};

const givenNowIs = (now: Date) => {
    dateProvider = new StubDateProvider(now);
}

const whenUserPostAMessage = (messageToPost: { id: string; author: string; text: string; }) => {
    try {
        if(messageToPost.text.length > 280) throw new MessageTooLongError();

        const postedMessage = new PostMessage(messageRepository, dateProvider);
        postedMessage.handle(messageToPost);
    } catch (_error) {
        thrownError = _error;
    }

}

const thenMessageShouldBe = (expectedMessage: Message) => {
    expect(message).toEqual(expectedMessage);
}

const thenErrorShouldBe = (expectedError: new () => Error) => {
    expect(thrownError).toBeInstanceOf(expectedError);
}
