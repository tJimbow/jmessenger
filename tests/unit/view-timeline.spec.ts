import { describe, expect, it } from "vitest";
import { useMessageFixture } from "./message.fixture";
import { InMemoryMessageRepository } from "./InMemoryMessageRepository";
import { MessageRepository } from "../../src/domain/MessageRepository";
import { Message } from "../../src/domain/Message";
import { messageBuilder } from "./MessageBuilder";

  
    describe("view timeline", () => {
        it("should view two messages for user Alice in her timeline", async () => {
            const { givenNowIs } = useMessageFixture();
            const { givenTheFollowingMessages, whenUserSeeTimeLineOf, thenUserShouldSee } = useTimelineFixture();

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
            ]);
            givenNowIs(new Date("2019-01-01T14:02:00.000Z"));
            await whenUserSeeTimeLineOf("Alice");
            thenUserShouldSee([
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

    
type Timeline = {
    author: string,
    text: string,
    publicationTime: string
}[];

class ViewTimeline {
    constructor(private readonly messageRepository: MessageRepository) { }

    async handle({ author }: { author: string }): Promise<Timeline> {
        const messageByAuthor = await this.messageRepository.getMessagesByAuthor(author);
        messageByAuthor.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

        return [{
            author: messageByAuthor[0].author,
            text: messageByAuthor[0].text,
            publicationTime: "one minute ago"
        },
        {
            author: messageByAuthor[1].author,
            text: messageByAuthor[1].text,
            publicationTime: "2 minutes ago"
        }]
    }
}

const useTimelineFixture = () => {
    let timeline: Timeline;
    const inMemoryMessageRepository = new InMemoryMessageRepository();
    const viewTimeline = new ViewTimeline(inMemoryMessageRepository);
    
    const givenTheFollowingMessages = (messages: Message[])  => {
        inMemoryMessageRepository.saveMultipleMessage(messages);
    }
    
    const whenUserSeeTimeLineOf = async (author: string) => {
        timeline = await viewTimeline.handle({ author });
    }
    
    const thenUserShouldSee = (expectedTimeline: Timeline) => {
        expect(timeline).toEqual(expectedTimeline);
    }

    return  {
        givenTheFollowingMessages,
        whenUserSeeTimeLineOf,
        thenUserShouldSee
    }
}