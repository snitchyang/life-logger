export interface IUser {
  id: number;
  username: string;
  password: string;
  biography: string;
  avatar: string;
  school: string;
  phoneNumber: number;
  gender: number;
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
  date: Date;
  title: string;
  content: string;
  images: IImage[];
  tag: ITag[];
}

export interface IComment {
  id: number;
  user: IUser;
  date: Date;
  content: string;
  post: IPost;
}

// 盆友圈帖子
export interface IPost {
  id: number;
  date: Date;
  link: string;
  location: string;
  content: string;
  image: string;
  user: IUser;
  likes: number;
  comments: IComment[];
  liker: IUser[];
}
