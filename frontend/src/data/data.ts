import { IDiary, IFriend, IImage, ITag } from "../interface";

export const curUserID = 1;

export const userinfo_enumerate = {
  changeProfile: 0,
  changeName: 1,
  changeGender: 2,
  changeBio: 3,
  changeSchool: 4,
};

export const gender_enumerate = {
  male: 0,
  female: 1,
  unknown: 2,
};

export const gender_text: string[] = ["male", "female", "unknown"];

export const users: IFriend[] = [
  {
    id: 1,
    username: "Alice",
    biography: "I'm Alice",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    school: "Fudan University",
    phoneNumber: 123,
    gender: 1,
    friends: [3, 4],
    diary: [],
    posts: [],
    plans: [],
  },
  {
    id: 2,
    username: "Bob",
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
    username: "Kitty",
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
    username: "Meggie",
    biography: "I'm Meggie",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    school: "ZJU",
    phoneNumber: 54741523,
    gender: 1,
    posts: [],
    diary: [],
    friends: [1],
    plans: [],
  },
];

// export const posts: IPost[] = [
//   {
//     id: 1,
//     date: new Date(),
//     link: "link",
//     location: "location",
//     content: "content",
//     image: "image",
//     user: users[0],
//     likes: 5,
//     comments: [],
//     liker: [users[0], users[1]],
//   },
// ];

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

export const images: IImage[] = [
  {
    path: "diary/pic1",
  },
  {
    path: "diary/pic2",
  },
];

export const diaries: IDiary[] = [
  {
    id: 1,
    date: new Date(),
    title: "I want to sleep",
    content: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    images: [images[0]],
    tag: [tags[0], tags[2]],
  },
  {
    id: 2,
    date: new Date(),
    title: "I want to study",
    content: "zzz",
    images: [images[0]],
    tag: [tags[1]],
  },
  {
    id: 3,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    images: [images[0]],
    tag: [tags[2]],
  },
  {
    id: 4,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    images: [images[0]],
    tag: [tags[3]],
  },
  {
    id: 5,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    images: [images[0]],
    tag: [tags[4], tags[0]],
  },
  {
    id: 6,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    images: [images[0]],
    tag: [tags[4], tags[0]],
  },
  {
    id: 7,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    images: [images[0]],
    tag: [tags[4], tags[0]],
  },
  {
    id: 8,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    images: [images[0]],
    tag: [tags[4], tags[0]],
  },
  {
    id: 9,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    images: [images[0]],
    tag: [tags[4], tags[0]],
  },
  {
    id: 10,
    date: new Date(),
    title: "I want to run",
    content: "sleep sleep sleep",
    images: [images[0]],
    tag: [tags[4], tags[0]],
  },
  {
    id: 11,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    images: [images[0]],
    tag: [tags[3]],
  },
  {
    id: 12,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    images: [images[0]],
    tag: [tags[3]],
  },
  {
    id: 13,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    images: [images[0]],
    tag: [tags[3]],
  },
  {
    id: 14,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    images: [images[0]],
    tag: [tags[3]],
  },
  {
    id: 15,
    date: new Date(),
    title: "I want to play",
    content: "play play play",
    images: [images[0]],
    tag: [tags[3]],
  },
  {
    id: 16,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    images: [images[0]],
    tag: [tags[2]],
  },
  {
    id: 17,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    images: [images[0]],
    tag: [tags[2]],
  },
  {
    id: 18,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    images: [images[0]],
    tag: [tags[2]],
  },
  {
    id: 19,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    images: [images[0]],
    tag: [tags[2]],
  },
  {
    id: 20,
    date: new Date(),
    title: "I want to eat",
    content: "eat eat eat",
    images: [images[0]],
    tag: [tags[2]],
  },
  {
    id: 21,
    date: new Date(),
    title: "yanjs nb",
    content: "yes yes",
    images: [images[0]],
    tag: [tags[1]],
  },
];
