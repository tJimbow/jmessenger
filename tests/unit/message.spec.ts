import { describe, it } from "vitest";
import { MessageTooLongError } from "../../src/domain/MessageTooLongError";
import { useMessageFixture } from "./message.fixture";
import { stubMessage } from "./StubMessage";
import { MessageEmptyError } from "../../src/domain/MessageEmptyError";

describe("message", () => {
    describe("posting a message", () => {
        it("should post a message", async () => {
            const { givenNowIs, whenUserPostAMessage, thenMessageShouldBe } = useMessageFixture();

            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            await whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: "my first message",
            });

            await thenMessageShouldBe(
                stubMessage({
                    text: "my first message",
                    postedAt: new Date("2019-01-01T14:02:30.000Z"),
                })
            );
        })

        it("should not post a message with more than 280 characters", async () => {
            const textWithMoreThan280Characters = "a".repeat(281);
            const { givenNowIs, whenUserPostAMessage, thenErrorShouldBe } = useMessageFixture();

            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            await whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: textWithMoreThan280Characters,
            });
            thenErrorShouldBe(MessageTooLongError)
        })
        
        it("should not post an empty message", async () => {
            const { givenNowIs, whenUserPostAMessage, thenErrorShouldBe } = useMessageFixture();

            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            await whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: "",
            });
            thenErrorShouldBe(MessageEmptyError)
        })
        
        it("should not post an message with only spaces", async () => {
            const { givenNowIs, whenUserPostAMessage, thenErrorShouldBe } = useMessageFixture();

            givenNowIs(new Date("2019-01-01T14:02:30.000Z"));
            await whenUserPostAMessage({
                id: "message-id",
                author: "Alice",
                text: "    ",
            });
            thenErrorShouldBe(MessageEmptyError)
        })
    });
});
