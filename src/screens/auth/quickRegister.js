import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TextInput,
    Modal,
    Image,
    TouchableOpacity
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { closeIcon } from '../../common/image';
import * as commonColors from "../../styles/colors";
import * as commonStyles from "../../styles/styles";
import { Actions } from 'react-native-router-flux';
import * as AuthAction from '../../store/auth/actions';
import WideButton from '../../components/Button/WideButton';
import HeaderBar from '../header';
import InputWithValidator from '../../components/TextField/InputWithValidator';
import * as Validators from '../../helpers/validators';

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            codeMsg: '',
            phone: '',
            phoneMsg: '',
            showModal: false,
        }
    }

    onReqCode = () => {
        this.setState({ status: 'req_code' });
        this.props.getCode(this.state.phone);
    }

    login = () => {
        const { phone, code } = this.state;
        console.log(this.state.phone, this.state.search);
        this.props.qlogin(phone, code, this.gotoMain);
        this.setState({ status: 'login' });
    }

    gotoMain = msg => {
        if (msg) {
            this.setState({ showModal: true, msg });
            return;
        }
        Actions.reset('Main');
    }

    phoneChange = (txt, message) => {
        this.props.clearMessage();
        this.setState({ phone: txt.replace(/\t/g, ""), phoneMsg: message });
    }

    codeChange = (txt, message) => {
        this.setState({ code: txt.replace(/\t/g, ""), codeMsg: message });
    }

    render() {
        const { success, message } = this.props;
        const { phone, phoneMsg, code, codeMsg } = this.state;
        const msgStyle = success ? { color: commonColors.green } : { color: commonColors.red };
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar title={'验证码登录'} />
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
                {
                    !!message && message.length > 0 && this.state.status === 'req_code' && (
                        <View style={{ paddingLeft: 40, textAlign: 'left', fontSize: 12 }}>
                            <Text style={msgStyle}>
                                {message}
                            </Text>
                        </View>
                    )
                }
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
                <View style={{ height: 25 }} />
                <TouchableOpacity style={styles.nextButton} onPress={this.login}>
                    <Text style={{ color: 'white', fontSize: 24 }}>登录</Text>
                </TouchableOpacity>
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
                                {this.state.msg}
                            </Text>
                            <WideButton title='确认' handleClick={() => this.setState({ showModal: false })} style={{ marginLeft: 0 }} />
                        </View>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { this.setState({ showModal: false }) }}>
                            <Image source={closeIcon} style={{ width: 40, height: 40, margin: 20 }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* {this.renderFooterOption()} */}
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
    getCode: (phone) => dispatch(AuthAction.getVerification(phone)),
    register: (phone, pwd, confirm, code) => dispatch(AuthAction.register(phone, pwd, confirm, code)),
    clearMessage: () => dispatch(AuthAction.clearMessage()),
    qlogin: (phone, code, cb) => dispatch(AuthAction.qlogin(phone, code, cb))
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
    modeConvert: { position: 'absolute', left: 30, bottom: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    wideButton: { height: 40, paddingHorizontal: 10, flexDirection: 'row', width: '86%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.cardColor6, marginLeft: '7%', borderRadius: 30 },
    nextButton: { height: 50, paddingHorizontal: 10, flexDirection: 'row', width: '86%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.malachite, marginLeft: '7%', borderRadius: 30 }
})