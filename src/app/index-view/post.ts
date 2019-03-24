import { DateTime } from 'luxon';

export interface Tag {
    name: string,
}

export interface Post {
    id: number,
    title: string, 
    intro? : string,
    publishTime : DateTime,
    tags: Tag[]
}