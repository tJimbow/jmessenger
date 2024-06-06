import { describe, expect, it } from "vitest";
import { MessageRepository, PostMessage } from "./PostMessage";
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

let now;
let message;

const saveMessage = (_message: Message) => {
    message = _message;
};

const givenNowIs = (_now: Date) => {
    now = _now;
}

const messageRepository: MessageRepository = {
    save: saveMessage
};

const whenUserPostAMessage = (messageToPost: { id: string; author: string; message: string; }) => {
    const postedMessage = new PostMessage(messageRepository, () => now);

    postedMessage.handle(messageToPost);
}

const thenMessageShouldBe = (expectedMessage: Message) => {
    expect(message).toEqual(expectedMessage);
}

