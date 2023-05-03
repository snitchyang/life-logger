import React from "react";
import { ChangeTextInfo } from "./ChangeTextInfo";

export const ChangeInfo = ({ usr, setUser, kind, visible, setVisible }) => {
  console.log("modal");
  console.log(kind);

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
};
