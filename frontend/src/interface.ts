export interface IUser {
  id: number;
  username: string;
  password: string;
  biography: string;
  email: string;
  avatar: string;
  school: string;
  phoneNumber: number;
  gender: string;
}

export interface IFriend {
  id: number;
  username: string;
  avatar: string;
}

export interface ResponseFriends {
  following: IFriend[];
  follow_me: IFriend[];
}

export interface IImage {
  path: string;
}

export interface IPlan {
  id: number;
  content: string;
  due: Date;
  finished: boolean;
}

export interface ITag {
  id: number;
  content: string;
}

export interface IDiary {
  id: number;
  begin: Date;
  end: Date;
  title: string;
  content: string;
  images: IImage[];
  tag: ITag[];
  tags: number[];
}

export interface IMessage {
  message: string;
}

export interface IComment {
  id: number;
  user: IFriend;
  date: Date;
  content: string;
}

// 盆友圈帖子
export interface IPost {
  id: number;
  date: Date;
  location: string;
  content: string;
  images: IImage[];
  user: IFriend;
  likes: number;
  comments: IComment[];
  liker: number[];
  liked: boolean;
}

export interface IToken {
  refresh: string;
  access: string;
  error: string;
}

export type Position = {
  longitude: number;
  latitude: number;
};

export interface IPResponse {
  status: boolean;
  info?: string;
  infocode: number;
  province: string;
  city: string;
  adcode: number;
  rectangle: [Position, Position];
}
