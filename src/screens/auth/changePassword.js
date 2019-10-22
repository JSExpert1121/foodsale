import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { fetchData } from '../../store/auth/actions'
import * as commonColors from "../../styles/colors";
import { Actions } from 'react-native-router-flux';
import HeaderBar from '../header';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserApi from '../../service/user';
import CustomInput from '../../components/TextField/CustomInput';
import Alert from '../../components/Dialog/Alert';

class ChangePassword extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            confirm: '',
            showModal: false,
            message: '',
            title: ''
        }
    }

    handleChange = name => text => {
        this.setState({
            [name]: text.replace(/\t/g, "")
        });
    }

    handleOK = async () => {
        const { token } = this.props;
        const { oldPass, newPass, confirm } = this.state;
        try {
            await UserApi.changePassword(token, oldPass, newPass, confirm);
            this.setState({
                showModal: true,
                title: '成功',
                message: '改修密码成功'
            });
        } catch (error) {
            console.log('ChangePassword.handleOK: ', error);
            this.setState({
                showModal: true,
                title: '失败',
                message: '改修密码失败'
            });
        }
    }

    render() {
        const { oldPass, newPass, confirm, showModal, title, message } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar title={'改修密码'} />
                <View style={{ height: 70 }} />
                <View style={styles.wideButton}>
                    <CustomInput
                        placeholder={"旧密码"}
                        style={{ ...styles.input, flex: 1 }}
                        value={oldPass}
                        onChange={this.handleChange('oldPass')}
                        secureTextEntry={true}
                    />
                </View><View style={styles.wideButton}>
                    <CustomInput
                        placeholder={"设置登录密码"}
                        style={{ ...styles.input, flex: 1 }}
                        value={newPass}
                        onChange={this.handleChange('newPass')}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.wideButton}>
                    <CustomInput
                        placeholder={"设置登录密码"}
                        style={{ ...styles.input, flex: 1 }}
                        value={confirm}
                        onChange={this.handleChange('confirm')}
                        secureTextEntry={true}
                    />
                </View>

                <View style={{ height: 20 }} />
                <TouchableOpacity style={styles.nextButton} onPress={this.handleOK}>
                    <Text style={{ color: 'white', fontSize: 24 }}>确定</Text>
                </TouchableOpacity>
                <Alert
                    open={showModal}
                    title={title}
                    content={message}
                    handleOK={() => this.setState({ showModal: false })}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
});

export default Login = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

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
        paddingVertical: 0,
        paddingHorizontal: 10
    },
    modeConvert: { position: 'absolute', left: 30, bottom: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    wideButton: {
        height: 40,
        marginVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: '86%',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonColors.cardColor6,
        marginLeft: '7%',
        borderRadius: 30
    },
    nextButton: { height: 50, paddingHorizontal: 10, flexDirection: 'row', width: '86%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.malachite, marginLeft: '7%', borderRadius: 30 }
})