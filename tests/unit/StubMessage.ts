import { Message, MessageOptions } from "../../src/domain/Message";

export const stubMessage = (options: Partial<MessageOptions> = {}): Message =>  (Message.of({
    id: "message-id",
    text: "message text",
    author: "Alice",
    postedAt: new Date("2019-01-01T14:02:30.000Z"),
    ...options
}))