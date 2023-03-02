import {IUser} from "../interface";
import {IDiary} from "../interface";
import {IComment} from "../interface";
import {ITag} from "../interface";
import {IPost} from "../interface";
import {IPlan} from "../interface";

export const curUserID = 1;
export const users: IUser[] = [
    {
        id: 1,
        name: 'Alice',
        profile: 'profile',
        profilePicture: 'profilePicture',
        phoneNumber: 123,
        friends: [],
        diary: [],
        posts: [],
        plans: [],

    },
    {
        id: 2,
        name: 'Bob',
        profile: 'profile',
        profilePicture: 'profilePicture',
        phoneNumber: 123,
        friends: [],
        diary: [],
        posts: [],
        plans: [],
    },
];
export const posts: IPost[] = [
    {
        id: 1,
        date: new Date(),
        link: 'link',
        location: 'location',
        content: 'content',
        image: 'image',
        user: users[0],
        likes: 5,
        comments: [],
        liker: [users[0], users[1]],
    },
];
