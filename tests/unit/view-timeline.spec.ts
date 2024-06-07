import { describe, expect, it } from "vitest";
import { useMessageFixture } from "./message.fixture";

  
    describe("view timeline", () => {
        it("should view two messages for user Alice in her timeline", async () => {
            const { givenNowIs } = useMessageFixture();
            const { givenTheFollowingMessages, whenUserSeeTimeLineOf, thenUserShouldSee } = useTimelineFixture();

            givenTheFollowingMessages([{
                id: "1",
                author: "Alice",
                text: "my first message",
                postedAt: new Date("2019-01-01T14:00:00.000Z")
            },
            {
                id: "2",
                author: "Bob",
                text: "my first message",
                postedAt: new Date("2019-01-01T14:01:30.000Z")
            },
            {
                id: "3",
                author: "Alice",
                text: "my second message",
                postedAt: new Date("2019-01-01T14:01:00.000Z")
            },
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
    async handle({ author }: { author: string }): Promise<Timeline> {
        return [{
            author: "Alice",
            text: "my second message",
            publicationTime: "one minute ago"
        },
        {
            author: "Alice",
            text: "my first message",
            publicationTime: "2 minutes ago"
        }];
    }
}

const useTimelineFixture = () => {
    let timeline: Timeline;
    const viewTimeline = new ViewTimeline();
    
    const givenTheFollowingMessages = (messageToList:  {
        id: string,
        author: string,
        text: string,
        postedAt: Date
    }[])  => {
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