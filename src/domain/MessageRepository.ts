import { Message } from "./Message";


export interface MessageRepository {
    save(message: Message): Promise<void>;
}