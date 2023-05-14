import React from "react";
import { ChangeTextInfo } from "./ChangeTextInfo";
import { IFriend } from "../../../../interface";
import { userinfo_enumerate } from "../../../../data/data";
import { ChangeImageInfo } from "./ChangeImageInfo";

interface Props {
  usr: IFriend;
  setUser: any;
  kind: number;
  visible: boolean;
  setVisible: any;
}

export const ChangeInfo = ({
  usr,
  setUser,
  kind,
  visible,
  setVisible,
}: Props) => {
  if (
    kind === userinfo_enumerate.changeSchool ||
    kind === userinfo_enumerate.changeBio ||
    kind === userinfo_enumerate.changeName
  ) {
    return (
      <ChangeTextInfo
        usr={usr}
        setUser={setUser}
        kind={kind}
        visible={visible}
        setVisible={setVisible}
      />
    );
  } else if (kind === userinfo_enumerate.changeProfile) {
    return (
      <ChangeImageInfo
        usr={usr}
        setUser={setUser}
        uri={usr.avatar}
        visible={visible}
        setVisible={setVisible}
      />
    );
  }
};
