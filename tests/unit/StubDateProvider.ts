import { DateProvider } from "../../src/infrastructure/primary/DateProvider";


export class StubDateProvider implements DateProvider {
    now: Date;

    getNow() {
        return this.now;
    }
}
