import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
// import CustomInput from './CustomInput';
import * as commonColors from "../../styles/colors";


export default class InputWithValidator extends Component {

    handleChange = txt => {
        let message = '';

        const { validators, onChange } = this.props;
        const count = validators.length;
        for (let i = 0; i < count; i++) {
            const validator = validators[i];
            if (!validator.func(txt)) {
                message = validator.message;
                break;
            }
        }

        onChange(txt, message);
    }

    render() {
        const { validators, value, onChange, message, extra, ...rest } = this.props;
        return (
            <View style={styles.root}>
                <View style={styles.row}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor={commonColors.placeholderText}
                        textAlign="left"
                        // underlineColorAndroid="transparent"
                        onChangeText={this.handleChange}
                        value={value}
                        {...rest}
                    />
                    {extra}
                </View>
                {!!message && message.length > 0 && (
                    <View>
                        <Text style={styles.error}>{message}</Text>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    error: {
        paddingLeft: 40,
        paddingVertical: 0,
        textAlign: 'left',
        fontSize: 12,
        color: commonColors.red
    },
    row: {
        height: 40,
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: '86%',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonColors.cardColor6,
        marginLeft: '7%',
        borderRadius: 30,
        marginVertical: 10
    },
});