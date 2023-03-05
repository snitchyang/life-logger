import { IUser } from "../interface";
import { IDiary } from "../interface";
import { IComment } from "../interface";
import { ITag } from "../interface";
import { IPost } from "../interface";
import { IPlan } from "../interface";

export const curUserID = 1;
export const users: IUser[] = [
  {
    id: 1,
    name: "Alice",
    profile: "profile",
    profilePicture: "profilePicture",
    phoneNumber: 123,
    friends: [],
    diary: [],
    posts: [],
    plans: [],
  },
  {
    id: 2,
    name: "Bob",
    profile: "profile",
    profilePicture: "profilePicture",
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
    link: "link",
    location: "location",
    content: "content",
    image: "image",
    user: users[0],
    likes: 5,
    comments: [],
    liker: [users[0], users[1]],
  },
];

export const tags: ITag[] = [
  {
    id: 1,
    content: "sleep",
  },
  {
    id: 2,
    content: "study",
  },
  {
    id: 3,
    content: "eat",
  },

  {
    id: 4,
    content: "play",
  },
  {
    id: 5,
    content: "run",
  },
];

export const diaries: IDiary[] = [
  {
    id: 1,
    date: new Date(),
    title: "I want to sleep",
    content: "zzz",
    image: ["testPic", "testPic2"],
    tag: [tags[0]],
  },
  {
    id: 2,
    date: new Date(),
    title: "I want to study",
    content: "zzz",
    image: ["testPic", "testPic2"],
    tag: [tags[1]],
  },
  {
    id: 3,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    image: ["testPic", "testPic2"],
    tag: [tags[2]],
  },
  {
    id: 4,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    image: ["testPic3"],
    tag: [tags[3]],
  },
  {
    id: 5,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    image: ["testPic2"],
    tag: [tags[4], tags[0]],
  },
  {
    id: 6,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    image: ["testPic2"],
    tag: [tags[4], tags[0]],
  },
  {
    id: 7,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    image: ["testPic2"],
    tag: [tags[4], tags[0]],
  },
  {
    id: 8,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    image: ["testPic2"],
    tag: [tags[4], tags[0]],
  },
  {
    id: 9,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    image: ["testPic2"],
    tag: [tags[4], tags[0]],
  },
  {
    id: 10,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    image: ["testPic2"],
    tag: [tags[4], tags[0]],
  },
  {
    id: 11,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    image: ["testPic3"],
    tag: [tags[3]],
  },
  {
    id: 12,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    image: ["testPic3"],
    tag: [tags[3]],
  },
  {
    id: 13,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    image: ["testPic3"],
    tag: [tags[3]],
  },
  {
    id: 14,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    image: ["testPic3"],
    tag: [tags[3]],
  },
  {
    id: 15,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    image: ["testPic3"],
    tag: [tags[3]],
  },
  {
    id: 16,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    image: ["testPic", "testPic2"],
    tag: [tags[2]],
  },
  {
    id: 17,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    image: ["testPic", "testPic2"],
    tag: [tags[2]],
  },
  {
    id: 18,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    image: ["testPic", "testPic2"],
    tag: [tags[2]],
  },
  {
    id: 19,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    image: ["testPic", "testPic2"],
    tag: [tags[2]],
  },
  {
    id: 20,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    image: ["testPic", "testPic2"],
    tag: [tags[2]],
  },
];
