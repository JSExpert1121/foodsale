import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import InputWithValidator from '../../components/TextField/InputWithValidator';
import * as Validators from '../../helpers/validators';
import * as AuthAction from '../../store/auth/actions';

import * as commonColors from "../../styles/colors";
import { Actions } from 'react-native-router-flux';
import HeaderBar from '../header';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            phoneMsg: '',
            password: '',
            passwordMsg: '',
            confirm: '',
            confirmMsg: '',
            code: '',
            codeMsg: '',
            status: 'ready'
        }
    }

    phoneChange = (txt, message) => {
        this.props.clearMessage();
        this.setState({ phone: txt.replace(/\t/g, ""), phoneMsg: message });
    }

    codeChange = (txt, message) => {
        this.setState({ code: txt.replace(/\t/g, ""), codeMsg: message });
    }

    passChange = (txt, message) => {
        this.setState({ password: txt.replace(/\t/g, ""), passwordMsg: message });
    }

    confirmChange = (txt, message) => {
        this.setState({ confirm: txt.replace(/\t/g, ""), confirmMsg: message });
    }

    onReqCode = () => {
        this.props.getCode(this.state.phone);
        this.setState({ status: 'req_code' });
    }

    recover = () => {
        const { phone, code, password, confirm } = this.state;
        this.props.recover(phone, code, password, confirm);
        this.setState({ status: 'recover' });
    }

    render() {
        const { message, success } = this.props;
        const { status, phone, phoneMsg, code, codeMsg, password, passwordMsg, confirm, confirmMsg } = this.state;
        const msgStyle = success ? { color: commonColors.green } : { color: commonColors.red };
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar title={'找回密码'} />
                <View style={{ height: 70 }} />
                <InputWithValidator
                    placeholder="请输入手机号"
                    style={{ ...styles.input, flex: 1 }}
                    value={phone}
                    onChange={this.phoneChange}
                    message={phoneMsg}
                    extra={phoneMsg.length === 0 && (
                        <TouchableOpacity onPress={this.onReqCode}>
                            <Text>获取验证吗</Text>
                        </TouchableOpacity>
                    )}
                    validators={[
                        { func: Validators.required, message: "手机号不能为空" },
                        { func: Validators.isValidPhone, message: "手机号错误" }
                    ]}
                />
                <InputWithValidator
                    placeholder="请输验证码"
                    style={{ ...styles.input, flex: 1 }}
                    value={code}
                    onChange={this.codeChange}
                    message={codeMsg}
                    validators={[
                        { func: Validators.isLength(6), message: '验证码长度必须为6' }
                    ]}
                />
                <InputWithValidator
                    placeholder="设置登录密码"
                    style={{ ...styles.input, flex: 1 }}
                    value={password}
                    onChange={this.passChange}
                    message={passwordMsg}
                    secureTextEntry={true}
                    validators={[
                        { func: Validators.required, message: "密码不能为空" },
                    ]}
                />
                <InputWithValidator
                    placeholder="再次输入密码"
                    style={{ ...styles.input, flex: 1 }}
                    value={confirm}
                    onChange={this.confirmChange}
                    message={confirmMsg}
                    secureTextEntry={true}
                    validators={[
                        { func: Validators.required, message: "密码不能为空" },
                    ]}
                />
                {
                    !!message && message.length > 0 && status === 'req_code' &&
                    <View style={{ paddingLeft: 40, textAlign: 'left' }}>
                        <Text style={msgStyle}>
                            {message}
                        </Text>
                    </View>
                }
                <TouchableOpacity onPress={this.recover} style={styles.nextButton}>
                    <Text style={{ color: 'white', fontSize: 24 }}>登录</Text>
                </TouchableOpacity>
                {
                    !!message && message.length > 0 && status === 'recover' &&
                    <View style={{ paddingLeft: 40, textAlign: 'left' }}>
                        <Text style={msgStyle}>
                            {message}
                        </Text>
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
    isProcessing: state.auth.isProcessing,
    success: state.auth.success,
    message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
    getCode: phone => dispatch(AuthAction.getRecoverCode(phone)),
    clearMessage: () => dispatch(AuthAction.clearMessage()),
    recover: (phone, code, password, confirm) => dispatch(AuthAction.recoverPassword(phone, password, confirm, code))
});


export default Login = connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
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
    modeConvert: { position: 'absolute', left: 30, bottom: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
    wideButton: { height: 40, paddingHorizontal: 10, flexDirection: 'row', width: '86%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.cardColor6, marginLeft: '7%', borderRadius: 30, marginVertical: 10 },
    nextButton: { height: 50, paddingHorizontal: 10, flexDirection: 'row', width: '86%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.malachite, marginLeft: '7%', borderRadius: 30, marginVertical: 10 }
})