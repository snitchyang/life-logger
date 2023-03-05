export interface IUser {
    id: number;
    name: string;
    profile: string;
    profilePicture: string;
    phoneNumber: number;
    posts: IPost[];
    diary: IDiary[];
    friends: IUser[];
    plans: IPlan[];
}

export interface IPlan {
    id: number;
    content: string
    due: Date
    finished: boolean
}

export interface ITag {
    id: number;
    content: string
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
