import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const LoginFooter = () => {
    return (
        <View style={{ paddingHorizontal: 20, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', color: 'grey' }} onPress={() => { Actions.ForgetPassword() }}>忘记密码</Text>
            <View style={{ height: 20, width: 1, backgroundColor: "grey" }}></View>
            <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', color: 'grey' }} onPress={() => { Actions.QuickRegister() }}>验证码登录</Text>
        </View>
    )
}

export default LoginFooter;