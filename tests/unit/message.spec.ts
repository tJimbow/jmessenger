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
                message: "my first message",
            });
            thenMessageShouldBe({
                id: "message-id",
                author: "Alice",
                message: "my first message",
                postedAt: new Date("2019-01-01T14:02:30.000Z")
            })
        })
    });
});

let message: Message;
let dateProvider: DateProvider;

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

const whenUserPostAMessage = (messageToPost: { id: string; author: string; message: string; }) => {
    const postedMessage = new PostMessage(messageRepository, dateProvider);

    postedMessage.handle(messageToPost);
}

const thenMessageShouldBe = (expectedMessage: Message) => {
    expect(message).toEqual(expectedMessage);
}

