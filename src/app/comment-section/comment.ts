import {DateTime} from 'luxon';

export interface Comment {
    id: number;
    publisherName: string;
    content: string;
    publishTime: DateTime;
    publisherEmail?: string;
    replyTo?: number;
}
