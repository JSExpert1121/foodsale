import React from 'react';
import { connect } from "react-redux";
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import Footer from './footer';
import InputWithValidator from '../../components/TextField/InputWithValidator';
import * as Validators from '../../helpers/validators';
import { loginBackground, weixin, closeIcon } from '../../common/image';
import * as commonColors from "../../styles/colors";
import { Actions } from 'react-native-router-flux';
import * as AuthAction from '../../store/auth/actions';
import * as commonStyles from "../../styles/styles";
import WideButton from '../../components/Button/WideButton';
import AsyncStorage from '@react-native-community/async-storage';
import AuthApi from '../../service/auth';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'register',
            phone: '17152928280',
            phoneMsg: '',
            code: '',
            codeMsg: '',
            password: 'timeisgold',
            passwordMsg: '',
            confirm: '',
            confirmMsg: '',
            status: 'ready',
            showModal: false,
            msg: ''
        }
    }

    async componentDidMount() {
        const { getuserSuccess, loginSuccess } = this.props;
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (token !== null) {
                const { data } = await AuthApi.getUser(token);
                getuserSuccess(data);
                loginSuccess(token);
                Actions.reset('Main');
            }
        } catch (error) {
            console.log('Login.CDM: ', error);
        }
    }

    goLogin = () => {
        this.setState({
            mode: 'login',
            status: 'ready',
            code: ''
        });
    }

    goRegister = () => {
        this.setState({
            mode: 'register',
            status: 'ready',
            code: ''
        });
    }

    renderLoginActive() {
        return (
            <View style={[styles.modeConvert]}>
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, color: 'white' }} onPress={this.goLogin}>注册</Text>
                    <View style={{ width: 40, height: 3, backgroundColor: 'white', marginTop: 4 }}></View>
                </View>
                <View style={{ width: 15 }} />
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: 'white' }} onPress={this.goRegister}>登录</Text>
                </View>
            </View>
        )
    }

    renderRegisterActive() {
        return (
            <View style={styles.modeConvert}>
                <TouchableOpacity style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, color: 'white' }} onPress={this.goRegister} >登录</Text>
                    <View style={{ width: 40, height: 3, backgroundColor: 'white', marginTop: 4 }}></View>
                </TouchableOpacity>
                <View style={{ width: 15 }} />
                <TouchableOpacity>
                    <Text style={{ fontSize: 18, color: 'white' }} onPress={this.goLogin} >注册</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // componentDidMount() {
    //     console.log("componentDidMount--")
    //     //this.props.fetchData()
    // }

    onReqCode = () => {
        this.setState({ status: 'req_code' });
        this.props.getCode(this.state.phone);
    }

    onRegister = () => {
        const { phone, code, password, confirm } = this.state;
        this.props.register(phone, password, confirm, code);
        this.setState({ status: 'register' });
    }

    onLogin = () => {
        const { phone, password } = this.state;
        console.log(this.state.phone, this.state.search);
        this.props.login(phone, password, this.gotoMain);
        this.setState({ status: 'login' });
    }

    onFreeLogin = () => {
        Actions.QuickRegister();
    }

    handleChange = name => value => {
        if (name === 'phone') {
            this.props.clearMessage();
        }
        this.setState({ [name]: value.replace(/\t/g, "") });
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

    gotoMain = msg => {
        if (msg) {
            this.setState({ showModal: true, msg });
            return;
        }
        Actions.reset('Main');
    }

    render() {
        const { success, message } = this.props;
        const { mode, msg, phone, phoneMsg, code, codeMsg, password, passwordMsg, confirm, confirmMsg } = this.state;
        const msgStyle = success ? { color: commonColors.green } : { color: commonColors.red };
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground source={loginBackground} style={styles.headerImageStyle}>
                    <Text style={{ fontSize: 24, color: 'white', textAlign: 'center', top: '35%' }}>欢迎来到家食客</Text>
                    {mode == "login" ? this.renderLoginActive() : this.renderRegisterActive()}
                </ImageBackground>
                <View style={{ height: 40 }} />
                <InputWithValidator
                    placeholder="请输入手机号"
                    style={{ ...styles.input, flex: 1 }}
                    value={phone}
                    onChange={this.phoneChange}
                    message={phoneMsg}
                    extra={mode === 'login' && phoneMsg.length === 0 && (
                        <TouchableOpacity onPress={this.onReqCode}>
                            <Text>获取验证吗</Text>
                        </TouchableOpacity>
                    )}
                    validators={[
                        { func: Validators.required, message: "手机号不能为空" },
                        { func: Validators.isValidPhone, message: "手机号错误" }
                    ]}
                />
                {
                    !!message && message.length > 0 && this.state.status === 'req_code' && (
                        <View style={{ paddingLeft: 40, textAlign: 'left', fontSize: 12 }}>
                            <Text style={msgStyle}>
                                {message}
                            </Text>
                        </View>
                    )
                }

                {mode === 'register' && (
                    <InputWithValidator
                        placeholder="登录密码"
                        style={{ ...styles.input, flex: 1 }}
                        value={password}
                        onChange={this.passChange}
                        message={passwordMsg}
                        secureTextEntry={true}
                        validators={[
                            { func: Validators.required, message: "密码不能为空" },
                        ]}
                    />
                )}
                {this.state.mode === 'login' && (
                    <React.Fragment>
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
                        <View style={{ paddingLeft: 40, textAlign: 'left', marginVertical: 10 }}>
                            <Text style={{ color: "grey" }}>
                                注册即表示您已阅读并同意 <Text style={{ color: commonColors.malachite }}>《用户协议》</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.nextButton} onPress={this.onRegister}>
                            <Text style={{ color: 'white', fontSize: 24 }}>注册</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                )}
                {this.state.mode !== 'login' && (
                    <React.Fragment>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.halfButton}
                                onPress={this.onLogin}
                            >
                                <Text style={{ color: 'white', fontSize: 20 }}>登录</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={{ ...styles.halfButton, backgroundColor: commonColors.limeGreen }}
                                onPress={this.onFreeLogin}
                            >
                                <Text style={{ color: 'white', fontSize: 20 }}>验证码登录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => { Actions.WeixinRegister() }} style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Image source={weixin} style={{ width: 35, height: 27, resizeMode: 'contain' }} />
                                <View style={{ height: 10 }} />
                                <Text>微信一键登录</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                )}
                {
                    !!message && message.length > 0 && this.state.status === 'login' &&
                    <View style={{ paddingLeft: 40, textAlign: 'left', marginVertical: 10 }}>
                        <Text style={msgStyle}>
                            {message + ' ' + this.state.phone}
                        </Text>
                    </View>
                }

                <View style={{ flex: 1 }} />
                <Footer />
                <Modal
                    visible={this.state.showModal}
                    transparent={true}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={{ width: '80%', height: '30%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[{ fontSize: 16 }, commonStyles.contentFont]}>
                                登录错误
                            </Text>
                            <Text style={[{ fontSize: 14 }, commonStyles.contentFont]}>
                                {msg}
                            </Text>
                            <WideButton title='确认' handleClick={() => this.setState({ showModal: false })} style={{ marginLeft: 0 }} />
                        </View>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { this.setState({ showModal: false }) }}>
                            <Image source={closeIcon} style={{ width: 40, height: 40, margin: 20 }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    getUser: (token) => dispatch(AuthAction.getUser(token)),
    getuserSuccess: data => dispatch(AuthAction.getuserSuccess(data)),
    loginSuccess: token => dispatch(AuthAction.loginSuccess(token)),
    getCode: (phone) => dispatch(AuthAction.getVerification(phone)),
    register: (phone, pwd, confirm, code) => dispatch(AuthAction.register(phone, pwd, confirm, code)),
    clearMessage: () => dispatch(AuthAction.clearMessage()),
    login: (phone, pwd, cb) => dispatch(AuthAction.login(phone, pwd, cb))
});


export default Login = connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerImageStyle: {
        width: '100%',
        height: 160
    },
    input: {
        fontSize: 14,
        color: commonColors.title,
        borderRadius: 3,
        marginBottom: 3,
        paddingHorizontal: 10,
        paddingVertical: 0,
        paddingLeft: 10,
        flex: 1
    },
    message: {
        fontSize: 12,
        paddingHorizontal: 10
    },
    button: {
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b7eff'
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modeConvert: {
        position: 'absolute',
        left: 30,
        bottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    wideButton: {
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
    nextButton: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: '86%',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonColors.malachite,
        marginLeft: '7%',
        borderRadius: 30,
        marginVertical: 10
    },
    halfButton: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: '40%',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonColors.malachite,
        marginLeft: '7%',
        borderRadius: 30,
        marginVertical: 10
    }
})