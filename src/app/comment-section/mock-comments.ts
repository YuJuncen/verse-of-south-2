import {Comment} from './comment';
const mockComments: Comment[] = [{
    id: 0,
    poster: "NG",
    content: "前往 Angular 国度的旅途，已经开始了！",
    publishTime: new Date()
}, {
    id: 2,
    poster: "SmallLight",
    content: "接下来，我们就要出发了！",
    publishTime: new Date(),
    referenceTo: 0
}];

export default mockComments;