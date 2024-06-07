import { Message } from "../../src/domain/Message";

export const messageBuilder = ({
    id = "message-id",
    text = "message text",
    author = "Alice",
    postedAt = new Date("2019-01-01T14:02:30.000Z")
}: {
    id?: string;
    text?: string;
    author?: string;
    postedAt?: Date;
} = {}) => {
    const props = { id, text, author, postedAt };

    const withId = (id: string) => messageBuilder({ ...props, id });
    const withText = (text: string) => messageBuilder({ ...props, text });
    const withAuthor = (author: string) => messageBuilder({ ...props, author });
    const withPostedAt = (postedAt: Date) => messageBuilder({ ...props, postedAt });
    const build = (): Message => Message.of(props);
    
    return {
        withId,
        withText,
        withAuthor,
        withPostedAt,
        build
    }
}