import {View} from 'react-native';
import {UserHeader} from "./UserHeader";
import {PostActionSection} from "./PostActionSection";
import {Link} from '@react-navigation/native';
import {Content} from './Content';
import {Image} from './Image';
import {IPost} from "../../interface";

export const Post = ({
                         id,
                         date,
                         link,
                         location,
                         content,
                         image,
                         user,
                     }: IPost): JSX.Element => {
    return (
        <View onTouchEnd={() => console.log(id)}>
            <Link to={`/posts/${id}`}>
                <UserHeader date={date} user={user}/>
                <Content content={content}/>
                <Image post={this}></Image>
            </Link>
            <PostActionSection postID={id}></PostActionSection>
        </View>
    );
};
