import {useTranslation} from "react-i18next";
import {View} from "react-native";
import {Button} from "@rneui/base";
import {COLOR} from "../constants";
import * as React from "react";

function HomePage() {
    const {t, i18n} = useTranslation()
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button color={COLOR.primary}
                    onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>{t('click here to change language')}</Button>
        </View>
    );
}

export default HomePage
