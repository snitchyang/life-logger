import React, { View } from "react-native";
import { ChangeTextInfo } from "./ChangeTextInfo";

export const ChangeInfo = ({
  // eslint-disable-next-line react/prop-types
  usr,
  // eslint-disable-next-line react/prop-types
  setUser,
  // eslint-disable-next-line react/prop-types
  kind,
  // eslint-disable-next-line react/prop-types
  visible,
  // eslint-disable-next-line react/prop-types
  setVisible,
}): JSX.Element => {
  if (kind === 1 || kind === 3) {
    return (
      <ChangeTextInfo
        usr={usr}
        setUser={setUser}
        kind={kind}
        visible={visible}
        setVisible={setVisible}
      />
    );
  }
  return <View />;
};
