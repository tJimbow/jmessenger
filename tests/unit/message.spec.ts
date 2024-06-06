import { describe, expect, it } from "vitest";

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

const givenNowIs = (_now: Date) => {
    now = _now;
}

const whenUserPostAMessage = (messageToPost: { id: string; author: string; message: string; }) => {
    message = messageToPost;
    message.postedAt = now;
}

const thenMessageShouldBe = (expectedMessage: { id: string; author: string; message: string; postedAt: Date; }) => {
    expect(message).toEqual(expectedMessage);
}

