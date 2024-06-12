interface PublicationTimeOptions {
    now: Date;
    postedAt: Date;
}

const ONE_MINUTE_TO_MS = 60000;

export class PublicationTime {
    readonly value: string;

    constructor(options: PublicationTimeOptions) {
        const timeElapsed = Math.floor((options.now.getTime() - options.postedAt.getTime()) / ONE_MINUTE_TO_MS);

        if (timeElapsed < 1) {
            this.value =  "less than a minute ago";
        }
        else if (timeElapsed < 2) {
            this.value =  "one minute ago";
        }
        else {
            this.value = `${timeElapsed} minutes ago`;
        }
    }

    static of(options: PublicationTimeOptions): PublicationTime {
        return new PublicationTime(options);
    }
}
