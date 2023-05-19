import SelectDropdown from "react-native-select-dropdown";
import { userInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import React from "react";
import { gender_text } from "../../../../data/data";
import { IUser } from "../../../../interface";
import { update_userinfo } from "../../../../service/UserService";

interface Props {
  gender: string;
  usr: IUser;
  setUser: any;
}

export const parseGender = (gender: string) => {
  if (gender === "male") return 0;
  if (gender === "female") return 1;
  return 2;
};

export const ChangeGenderInfo = ({ gender, usr, setUser }: Props) => {
  return (
    <SelectDropdown
      data={gender_text}
      defaultButtonText={gender}
      buttonStyle={userInfoStyleSheet.boxInfo}
      buttonTextStyle={userInfoStyleSheet.selectInfoText}
      defaultValueByIndex={parseGender(gender)}
      rowTextStyle={userInfoStyleSheet.selectInfoText}
      selectedRowTextStyle={userInfoStyleSheet.selectedText}
      onSelect={(selectedItem, index) => {
        let newUsr = usr;
        newUsr.gender = selectedItem;
        setUser(newUsr);
        update_userinfo(newUsr).catch((err) => console.error(err));
      }}
    />
  );
};
