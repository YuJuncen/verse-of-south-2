import { Post } from '../index-view/post';
import {Comment } from '../comment-section/comment';

export enum FormatType {
    Markdown, PlainText, HTML
};

export interface DetailedPost extends Post {
    content: string,
    contentFormatType: FormatType,
    comments: Comment[],
};