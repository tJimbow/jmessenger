import { describe, expect, it } from "vitest";
import { useMessageFixture } from "./message.fixture";
import { PublicationTime } from "./publicationTime";
import { messageBuilder } from "./MessageBuilder";


describe("view timeline", () => {
    it("should view two messages for user Alice in her timeline", async () => {
        const { givenNowIs, givenTheFollowingMessages, whenUserSeeTimeLineOf, thenUserShouldSee } = useMessageFixture();

        givenTheFollowingMessages([
            messageBuilder()
                .withId("1")
                .withAuthor("Alice")
                .withText("my first message")
                .withPostedAt(new Date("2019-01-01T14:00:00.000Z"))
                .build(),
            messageBuilder()
                .withId("2")
                .withAuthor("Bob")
                .withText("my first message")
                .withPostedAt(new Date("2019-01-01T14:01:30.000Z"))
                .build(),
            messageBuilder()
                .withId("3")
                .withAuthor("Alice")
                .withText("my second message")
                .withPostedAt(new Date("2019-01-01T14:01:00.000Z"))
                .build(),
            messageBuilder()
                .withId("4")
                .withAuthor("Alice")
                .withText("my last message")
                .withPostedAt(new Date("2019-01-01T14:01:30.000Z"))
                .build(),
        ]);
        givenNowIs(new Date("2019-01-01T14:02:00.000Z"));
        await whenUserSeeTimeLineOf("Alice");
        thenUserShouldSee([
            {
                author: "Alice",
                text: "my last message",
                publicationTime: "less than a minute ago"
            },
            {
                author: "Alice",
                text: "my second message",
                publicationTime: "one minute ago"
            },
            {
                author: "Alice",
                text: "my first message",
                publicationTime: "2 minutes ago"
            }
        ]);
    });
});


describe("publicationTime", () => {
    it("should return less than a minute ago when the publication time is inferior to one minute ago", () => {
        const now = new Date("2019-01-01T14:00:00.000Z");
        const postedAt = new Date("2019-01-01T13:59:30.000Z");

        const text = new PublicationTime({now, postedAt}).value;

        expect(text).toBe("less than a minute ago");
    });

    it("should return one minute ago when publication time is inferior to two minutes", () => {
        const now = new Date("2019-01-01T14:00:00.000Z");
        const postedAt = new Date("2019-01-01T13:58:58.000Z");

        const text = new PublicationTime({now, postedAt}).value;

        expect(text).toBe("one minute ago");
    });

    it.each([{
        now: new Date("2019-01-01T14:00:00.000Z"),
        postedAt: new Date("2019-01-01T13:57:01.000Z"),
        expectedText: "2 minutes ago"
    }, {
        now: new Date("2019-01-01T14:00:00.000Z"),
        postedAt: new Date("2019-01-01T13:56:30.000Z"),
        expectedText: "3 minutes ago"
    }, {
        now: new Date("2019-01-01T14:00:00.000Z"),
        postedAt: new Date("2019-01-01T13:55:30.000Z"),
        expectedText: "4 minutes ago"
    }])("should return $expectedText", ({ now, postedAt, expectedText}) => {
        const text = new PublicationTime({now, postedAt}).value;

        expect(text).toBe(expectedText);
    });
})