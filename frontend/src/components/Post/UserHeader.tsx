import React, { View } from "react-native";
import { type IUser } from "../../interface";

interface Props {
  date: Date;
  user: IUser;
}

export const UserHeader = ({ user, date }: Props): JSX.Element => {
  return (
    <View>
      <div className={"user-header"}>
        <div className={"user-info-section"}>
          <img src={user.avatar} style={{}} className={"img-circle"} alt={""} />
          <a>{user.username}</a>
        </div>
        <small className={"date"}>
          {new Date().getTime() - new Date(date).getTime()}
          {" ago"}
        </small>
      </div>
    </View>
  );
};
