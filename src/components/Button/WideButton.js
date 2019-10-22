import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import * as commonColors from "../../styles/colors";

export default function WideButton({ title, handleClick, style, disabled }) {
    const btnStyle = {
        ...styles.wideButton,
        ...style,
        backgroundColor: disabled ? commonColors.gray9 : commonColors.limeGreen
    };

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={btnStyle}
            onPress={handleClick}
            disabled={disabled}
        >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wideButton: {
        height: 40,
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: '86%',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonColors.limeGreen,
        marginLeft: '7%',
        borderRadius: 8,
        marginVertical: 15
    }
})