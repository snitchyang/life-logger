import {View} from 'react-native';
import {IUser} from "../../interface";

interface UserHeader {
    date: Date;
    user: IUser;
}

export const UserHeader = ({user, date}: UserHeader) => {
    return (
        <View>
            <div className={'user-header'}>
                <div className={'user-info-section'}>
                    <img
                        src={user.profilePicture}
                        style={{}}
                        className={'img-circle'}
                        alt={''}
                    />
                    <a>{user.name}</a>
                </div>
                <small className={'date'}>
                    {new Date().getTime() - new Date(date).getTime()}
                    {' ago'}
                </small>
            </div>
        </View>
    );
};
