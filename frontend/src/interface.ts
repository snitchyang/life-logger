export interface IUser {
  id: number;
  username: string;
  password: string;
  biography: string;
  avatar: string;
  school: string;
  phoneNumber: number;
  gender: number;
  posts: IPost[];
  diary: IDiary[];
  friends: number[];
  plans: IPlan[];
  likePost: IPost[];
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
  diary: IDiary[];
}

export interface IDiary {
  id: number;
  date: Date;
  title: string;
  content: string;
  image: string[];
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
