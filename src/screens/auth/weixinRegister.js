import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import {
    logo
} from '../../common/image';
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as commonColors from "../../styles/colors";
import * as commonStyles from "../../styles/styles";

import { Actions } from 'react-native-router-flux';
import HeaderBar from '../header';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'login'
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', marginTop: Constants.statusBarHeight, width: '100%', height: 70, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <Ionicons name={'md-close'} style={{ marginLeft: 15 }} size={28} color={'white'} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 24, marginLeft: 30 }}>微信登录</Text>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                    <Image source={logo} style={{ width: 55, height: 90 }}></Image>
                </View>
                <View style={{ marginLeft: 40, marginTop: 40 }}>
                    <Text style={[commonStyles.accentFont, { fontSize: 16 }]}>登录后该应用将获得以下权限</Text>
                    <View style={{ height: 15 }} />
                    <Text style={[commonStyles.contentFont, { fontSize: 16 }]}>‧获得你的公开信息 （昵称）</Text>
                </View>
                <View style={{ height: 50 }} />
                <TouchableOpacity style={styles.nextButton}>
                    <Text style={{ color: 'white', fontSize: 24 }}>登录</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default Login = connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
    },
    headerImageStyle: {
        width: '100%',
        height: 200
    },
    input: {
        fontSize: 14,
        color: commonColors.title,
        alignSelf: "stretch",
        borderRadius: 3,
        marginBottom: 3,
        paddingHorizontal: 10,
        paddingLeft: 10,
    },
    modeConvert: { position: 'absolute', left: 30, bottom: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    wideButton: { height: 40, paddingHorizontal: 10, flexDirection: 'row', width: '86%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.cardColor6, marginLeft: '7%', borderRadius: 30 },
    nextButton: { height: 50, paddingHorizontal: 10, flexDirection: 'row', width: '86%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.malachite, marginLeft: '7%', borderRadius: 30 }
})