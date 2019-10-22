import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import {
    uncheck, weixinIcon, alipayIcon, check, yuanIcon, closeIcon
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header';
import WideButton from '../components/Button/WideButton';
import DownCounter from '../components/Others/DownCounter';

import * as AuthAction from '../store/auth/actions';
import PayApi from '../service/pay';
import XPay from 'react-native-puti-pay';


class InstantOrder extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 'weixin',
            showOrderList: false,
            showMessage: false,
            message: '',
            currentTime: 180
        }
    }

    timer = 0;

    componentDidMount() {
        this.timer = setInterval(this.fnTimeout, 1000);
    }

    fnTimeout = () => {
        const { currentTime } = this.state;
        if (currentTime <= 1) {
            clearInterval(this.timer);
            this.timer = -1;
            this.setState({ showMessage: true, message: '您已经付款超时，订单失败', currentTime: 0 });
        } else {
            this.setState({ currentTime: currentTime - 1 });
        }
    }

    handleOK = () => {
        if (this.timer === -1) {
            Actions.reset('Main');
        } else {
            this.setState({ showMessage: false });
        }
    }

    pay = (credit, mode) => new Promise((resolve, reject) => {
        if (mode === 'alipay') {
            XPay.setAlipayScheme('ap2016101000653729');
            XPay.alipay(credit, res => {
                console.log(res);
                if (res.resultStatus != 9000) {
                    reject(res.memo);
                } else {
                    resolve(res.result);
                }
            });
        } else {
            if (!credit.partnerId) reject('')
            XPay.wxPay(credit, res => {
                console.log(res);
                if (res.resultStatus != 200) {
                    reject(res.memo);
                } else {
                    resolve(res.result);
                }
            });
        }
    });

    handlePay = async () => {
        const { selectedMode } = this.state;
        const { token, getUser } = this.props;
        const order = this.props.existingOrder || this.props.order;
        if (!order || order.final_amount === 0) return;

        // pay api call
        try {
            const result = await PayApi.appPay(token, order.order_no, selectedMode);
            clearInterval(this.timer);
            // console.log('InstantOrder.handlePay: ', result);
            if (selectedMode === 'balance') {
                await getUser(token);
                Actions.PayDetail({ mode: selectedMode, amount: order.final_amount });
            } else {
                await this.pay(result, selectedMode);
                await getUser(token);
                Actions.PayDetail({ mode: selectedMode, amount: order.final_amount });
            }
        } catch (error) {
            console.log('InstantOrder.handlePay: ', error);
            this.setState({ showMessage: true, message: '支付失败' });
        }
    }

    render() {
        const { currentTime, selectedMode, showMessage, message } = this.state;
        const order = this.props.existingOrder || this.props.order;
        const amount = order ? order.final_amount : 0;
        return (
            <View style={styles.root}>
                <HeaderBar title={'提交订单'} />
                <ScrollView>
                    <View style={{ height: 25 }} />
                    <View style={{ justifyContent: 'center', alignItems: "center", marginVertical: 20 }}>
                        <Text style={[{ fontSize: 24 }, commonStyles.accentFont]}>剩余支付时间</Text>
                        <DownCounter time={currentTime} />
                        {/* <View style={{ width: 100, marginTop: 20, height: 30, backgroundColor: commonColors.limeGreen, alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}>
                            <Text style={{ color: "white" }}>03:00</Text>
                        </View> */}
                        <Text style={[{ fontSize: 24, color: 'red', margin: 10 }]}>¥ {amount}</Text>
                    </View>
                    <Text style={{ marginLeft: 30, fontSize: 18 }}>{'支付方式'}</Text>
                    <View style={{ height: 20 }} />
                    <TouchableOpacity onPress={() => { this.setState({ selectedMode: 'weixin' }) }}>
                        <View style={styles.paymentMode}>
                            <Image source={weixinIcon} style={{ width: 20, height: 20 }} />
                            <View style={{ width: 10 }} />
                            <Text style={{ fontSize: 18 }}>{'微信支付'}</Text>
                            <View style={{ flex: 1 }} />
                            {
                                selectedMode === 'weixin' ?
                                    <Image source={check} style={{ width: 25, height: 25 }} /> :
                                    <Image source={uncheck} style={{ width: 25, height: 25 }} />
                            }
                            <View style={{ width: 30 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 20 }} />
                    <TouchableOpacity onPress={() => { this.setState({ selectedMode: 'alipay' }) }}>
                        <View style={styles.paymentMode}>
                            <Image source={alipayIcon} style={{ width: 20, height: 20 }} />
                            <View style={{ width: 10 }} />
                            <Text style={{ fontSize: 18 }}>{'支付宝支付'}</Text>
                            <View style={{ flex: 1 }} />
                            {
                                selectedMode === 'alipay' ?
                                    <Image source={check} style={{ width: 25, height: 25 }} /> :
                                    <Image source={uncheck} style={{ width: 25, height: 25 }} />
                            }
                            <View style={{ width: 30 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 20 }} />
                    <TouchableOpacity onPress={() => { this.setState({ selectedMode: 'balance' }) }}>
                        <View style={styles.paymentMode}>
                            <Image source={yuanIcon} style={{ width: 20, height: 20 }} />
                            <View style={{ width: 10 }} />
                            <Text style={{ fontSize: 18 }}>{'余额支付'}</Text>
                            <View style={{ flex: 1 }} />
                            {
                                selectedMode === 'balance' ?
                                    <Image source={check} style={{ width: 25, height: 25 }} /> :
                                    <Image source={uncheck} style={{ width: 25, height: 25 }} />
                            }
                            <View style={{ width: 30 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 40 }}></View>
                    <WideButton title='立即支付' handleClick={this.handlePay} />
                    <View style={{ flex: 1 }}></View>
                </ScrollView>
                <Modal
                    visible={showMessage}
                    transparent={true}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={{ width: '80%', height: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, ...commonStyles.contentFont, paddingTop: 12 }} >
                                {message}
                            </Text>
                            <WideButton title='确认' handleClick={this.handleOK} style={{ marginLeft: 0 }} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    order: state.order.order,
});

const mapDispatchToProps = dispatch => ({
    getUser: (token) => dispatch(AuthAction.getUser(token))
});


export default InstantOrder = connect(mapStateToProps, mapDispatchToProps)(InstantOrder);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    chargeBack: {
        width: screenWidth / 2 - 30,
        height: 80,
        backgroundColor: commonColors.chargeBack,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
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
        justifyContent: 'center',
    },
    paymentMode: { flexDirection: 'row', alignItems: 'center', marginLeft: 30 }
})