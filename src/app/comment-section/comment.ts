import {DateTime} from 'luxon';

export interface Comment {
    id: number;
    poster: String;
    content: String;
    publishTime: DateTime;
    referenceTo? : number;
}