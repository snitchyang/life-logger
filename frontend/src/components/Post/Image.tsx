import {IPost} from "../../interface";

interface Image {
    post: IPost;
}

export const Image = ({post}: Image) => {
    if (post && post.image)
        return <img className={'image-responsive'} src={post.image} alt={''}></img>;
    return <></>;
};
