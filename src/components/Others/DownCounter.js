import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import * as commonColors from "../../styles/colors";

export default function DownCounter({ time }) {

    let mins = parseInt(time / 60).toString();
    let secs = (time - mins * 60).toString();
    if (mins.length < 2) mins = '0' + mins;
    if (secs.length < 2) secs = '0' + secs;


    return (
        <View style={{ width: 100, marginTop: 20, height: 30, backgroundColor: commonColors.limeGreen, alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}>
            <Text style={{ color: "white" }}>{`${mins}:${secs}`}</Text>
        </View>
    )
}
