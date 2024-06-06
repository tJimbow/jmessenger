import { MessageTooLongError } from "./MessageTooLongError";

export class MessageText {
    private constructor(readonly value: string) {
    }

    static of(text: string): MessageText {
        if (text.length > 280) {
            throw new MessageTooLongError();
        }

        return new MessageText(text);
    }
}