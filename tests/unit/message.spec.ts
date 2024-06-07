import { describe, expect, it } from "vitest";
import { PostMessage, MessageToPost } from "../../src/infrastructure/primary/PostMessage";
import { MessageRepository } from "../../src/domain/MessageRepository";
import { Message } from "../../src/domain/Message";
import { MessageTooLongError } from "../../src/domain/MessageTooLongError";
import { MessageEmptyError } from "../../src/domain/MessageEmptyError";
import { DateProvider } from "../../src/infrastructure/primary/DateProvider";

describe("message", () => {
    describe("posting a message", () => {
        it("should post a message", async () => {
            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            await whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: "my first message",
            });
            thenMessageShouldBe(Message.of({
                id: "message-id",
                author: "Alice",
                text: "my first message",
                postedAt: new Date("2019-01-01T14:02:30.000Z")
            }))
        })

        it("should not post a message with more than 280 characters", async () => {
            const textWithMoreThan280Characters = "a".repeat(281);

            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            await whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: textWithMoreThan280Characters,
            });
            thenErrorShouldBe(MessageTooLongError)
        })
        
        it("should not post an empty message", async () => {
            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            await whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: "",
            });
            thenErrorShouldBe(MessageEmptyError)
        })
    });
});

let message: Message;
let dateProvider: DateProvider;
let thrownError: Error;

class StubDateProvider implements DateProvider {
    constructor(private readonly now: Date) { }

    getNow() {
        return this.now;
    }
}

const messageRepository: MessageRepository = {
    save: (_message: Message) => {
        message = _message;

        return Promise.resolve();
    }
};

const givenNowIs = (now: Date) => {
    dateProvider = new StubDateProvider(now);
}

const whenUserPostAMessage = async (messageToPost: MessageToPost) => {
    try {
        const postedMessage = new PostMessage(messageRepository, dateProvider);
        await postedMessage.handle(messageToPost);
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
