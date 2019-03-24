import { Post } from '../index-view/post';

export enum FormatType {
    Markdown, PlainText, HTML
};

export interface DetailedPost extends Post {
    content: string,
    contentFormatType: FormatType
};