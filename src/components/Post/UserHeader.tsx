import { View } from "react-native";
import { IUser } from "../../interface";
import { Image, Text } from "@rneui/base";
import { timeToNowChinese } from "../timeHandle";

interface UserHeader {
  date: Date;
  user: IUser;
  location: string;
}

export const UserHeader = ({ date, user, location }: UserHeader) => {
  return (
    <View style={{ flexDirection: "row", paddingTop: 0, paddingLeft: 0 }}>
      <Image
        alt={"error"}
        source={{ uri: user.profilePicture }}
        style={{ height: 50, width: 50 }}
      />
      <View
        style={{
          flexDirection: "column",
          paddingLeft: 10,
          paddingBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20 }}>{user.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 13, paddingTop: 1 }}>
            {timeToNowChinese(date)}
            {"前"}
          </Text>
          <Text style={{ fontSize: 15, paddingLeft: 10 }}>{location}</Text>
        </View>
      </View>
    </View>
  );
};
