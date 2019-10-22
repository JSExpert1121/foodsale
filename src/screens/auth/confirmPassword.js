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
import HeaderBar from '../header'
import Ionicons from '@expo/vector-icons/Ionicons';

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'login'
        }
    }
    componentWillReceiveProps(props) {

    }
    renderLoginActive() {
        return (
            <View style={styles.modeConvert}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, color: 'white' }} onPress={() => { this.setState({ mode: 'login' }) }}>注册</Text>
                    <View style={{ width: 25, height: 3, backgroundColor: 'white', marginTop: 4 }}></View>
                </View>
                <View style={{ width: 15 }} />
                <View>
                    <Text style={{ fontSize: 18, color: 'white' }} onPress={() => { this.setState({ mode: 'register' }) }}>登录</Text>
                </View>
            </View>
        )
    }
    renderRegisterActive() {
        return (
            <View style={styles.modeConvert}>
                <View>
                    <Text style={{ fontSize: 18, color: 'white' }} onPress={() => { this.setState({ mode: 'login' }) }} >注册</Text>
                </View>
                <View style={{ width: 15 }} />
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, color: 'white' }} onPress={() => { this.setState({ mode: 'register' }) }} >登录</Text>
                    <View style={{ width: 25, height: 3, backgroundColor: 'white', marginTop: 4 }}></View>
                </View>
            </View>
        )
    }
    renderFooterOption() {
        return (
            <View style={{ paddingHorizontal: 20, marginBottom: 5, position: "absolute", bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', color: 'grey' }} onPress={() => { }}>忘记密码</Text>
                <View style={{ height: 20, width: 1, backgroundColor: "grey" }}></View>
                <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', color: 'grey' }} onPress={() => { }}>立即登录</Text>
            </View>
        )
    }
    render() {
        var props = this.props
        let { mode } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar
                    title={'确定'}

                />
                <View style={{ height: 70 }} />
                <View style={styles.wideButton}>
                    <TextInput
                        ref="search"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={"设置登录密码"}
                        placeholderTextColor={commonColors.placeholderText}
                        textAlign="left"
                        style={[styles.input, { flex: 1 }]}
                        underlineColorAndroid="transparent"
                        value={this.state.search}
                        onChangeText={text => {
                            this.setState({ search: text.replace(/\t/g, "") })

                        }
                        }
                    />
                </View>
                <View style={{ height: 20 }} />
                <View style={styles.wideButton}>
                    <TextInput
                        ref="search"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={"再次输入密码"}
                        placeholderTextColor={commonColors.placeholderText}
                        textAlign="left"
                        style={[styles.input, { flex: 1 }]}
                        underlineColorAndroid="transparent"
                        value={this.state.search}
                        onChangeText={text => {
                            this.setState({ search: text.replace(/\t/g, "") })

                        }
                        }
                    />
                    <Ionicons name={'md-eye'} size={22} color={'grey'} />
                </View>
                <View style={{ height: 25 }} />
                <TouchableOpacity style={styles.nextButton}>
                    <Text style={{ color: 'white', fontSize: 24 }}>确定</Text>
                </TouchableOpacity>
                {/* {this.renderFooterOption()} */}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    authData: state.auth
});

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData())
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