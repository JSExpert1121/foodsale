import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { uncheck, check } from '../../common/image';

const PayItem = (props) => {
    const { icon, text, active, handlePress } = props;

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 30 }}>
                <Image source={icon} style={{ width: 20, height: 20 }} />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 18 }}>{text}</Text>
                <View style={{ flex: 1 }} />
                {active ? <Image source={check} style={{ width: 25, height: 25 }} /> :
                    <Image source={uncheck} style={{ width: 25, height: 25 }} />}
            </View>
        </TouchableOpacity>
    )
}

export default PayItem;