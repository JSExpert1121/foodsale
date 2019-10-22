import React from 'react';
import { TextInput } from 'react-native';
import * as commonColors from "../../styles/colors";

const CustomInput = ({ onChange, value, ...rest }) => {

    return (
        <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={commonColors.placeholderText}
            textAlign="left"
            underlineColorAndroid="transparent"
            value={value}
            onChangeText={onChange}
            keyboardType={'default'}
            {...rest}
        />
    )
}

export default CustomInput;