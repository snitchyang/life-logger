import SelectDropdown from "react-native-select-dropdown";
import {
  changeInfoStyleSheet,
  userInfoStyleSheet,
} from "../../../../screens/Profiles/UserInfoStyleSheet";

const gender = ["male", "female", "unknown"];
export const ChangeGenderInfo = ({ Gender }) => {
  function gender2Index(Gender) {
    if (Gender === "male") return 0;
    else if (Gender === "female") return 1;
    return 2;
  }
  return (
    <SelectDropdown
      data={gender}
      defaultButtonText={Gender}
      buttonStyle={userInfoStyleSheet.boxInfo}
      buttonTextStyle={userInfoStyleSheet.selectInfoText}
      defaultValueByIndex={gender2Index(Gender)}
      rowTextStyle={userInfoStyleSheet.selectInfoText}
      selectedRowTextStyle={userInfoStyleSheet.selectedText}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
    />
  );
};
