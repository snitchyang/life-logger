import { IUser, IDiary, IComment, ITag, IPost, IPlan } from "../interface";

export const curUserID = 1;

export const users: IUser[] = [
  {
    id: 1,
    name: "Alice",
    profile: "I'm Alice",
    profilePicture: "https://randomuser.me/api/portraits/lego/2.jpg",
    school: "Fudan University",
    phoneNumber: 123,
    gender:1,
    friends: [],
    diary: [],
    posts: [],
    plans: [],
  },
  {
    id: 2,
    name: "Bob",
    profile: "I'm Bob",
    profilePicture: "https://randomuser.me/api/portraits/men/25.jpg",
    school: "Fudan University",
    phoneNumber: 123,
    gender: 0,
    friends: [],
    diary: [],
    posts: [],
    plans: [],
  },
  {
    id: 3,
    name: "Kitty",
    profile: "I'm Kitty",
    profilePicture: "https://randomuser.me/api/portraits/lego/2.jpg",
    school: "SJTU",
    phoneNumber: 54749110,
    gender: 1,
    posts: [],
    diary: [],
    friends: [1],
    plans: [],
  },
  {
    id: 4,
    name: "Meggie",
    profile: "I'm Meggie",
    profilePicture: "https://randomuser.me/api/portraits/lego/2.jpg",
    school: "ZJU",
    phoneNumber: 54741523,
    gender: 1,
    posts: [],
    diary: [],
    friends: [1],
    plans: [],
  },
];
export const currentUser = users[0];
export const comments: IComment[] = [
  {
    id: 1,
    date: new Date(1675916400810),
    content: "comments",
    user: users[1],
  },
  {
    id: 2,
    date: new Date(1677916400810),
    content: "comments",
    user: users[2],
  },
  {
    id: 3,
    date: new Date(1677916410810),
    content: "comments",
    user: users[3],
  },
  {
    id: 4,
    date: new Date(1677916420810),
    content: "comments",
    user: users[0],
  },
  {
    id: 5,
    date: new Date(1677916430810),
    content: "comments",
    user: users[0],
  },
];

export const posts: IPost[] = [
  {
    id: 1,
    date: new Date(1675906430818),
    link: "link",
    location: "location",
    content:
      "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
    image: "image",
    user: users[0],
    likes: 5,
    comments: [comments[0], comments[1]],
    liker: [users[0], users[1], users[2]],
  },
  {
    id: 2,
    date: new Date(1677906400818),
    link: "link",
    location: "location",
    content: "contentcontentcontentcontentcontent",
    image: "image",
    user: users[1],
    likes: 100,
    comments: [comments[2], comments[3]],
    liker: [users[1], users[3]],
  },
  {
    id: 3,
    date: new Date(1677906400818),
    link: "link",
    location: "location",
    content: "contentcontentcontentcontentcontent",
    image: "image",
    user: users[0],
    likes: 100,
    comments: [],
    liker: [],
  },
  {
    id: 4,
    date: new Date(1677806400818),
    link: "link",
    location: "location",
    content: "contentcontentcontentcontentcontent",
    image: "image",
    user: users[2],
    likes: 10,
    comments: [],
    liker: [],
  },
  {
    id: 5,
    date: new Date(1677906400818),
    link: "link",
    location: "location",
    content: "contentcontentcontentcontentcontent",
    image: "image",
    user: users[3],
    likes: 0,
    comments: [],
    liker: [],
  },
  {
    id: 6,
    date: new Date(1676906400818),
    link: "link",
    location: "location",
    content: "contentcontentcontentcontentcontent",
    image: "image",
    user: users[3],
    likes: 100,
    comments: [],
    liker: [],
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
    content: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    image: ["testPic", "testPic2"],
    tag: [tags[0], tags[2]],
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
  {
    id: 21,
    date: new Date(),
    title: "yanjs nb",
    content: "yes yes",
    image: [],
    tag: [tags[1]],
  },
];
