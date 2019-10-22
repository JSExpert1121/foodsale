import React, { PureComponent, createRef } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { connect } from "react-redux";
import {
    weixinIcon, alipayIcon, check, chargeSticker
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header'
import WideButton from '../components/Button/WideButton';
import * as PayAction from '../store/pay/actions';
import * as AuthAction from '../store/auth/actions';
import PayApi from '../service/pay';
import PayItem from '../components/PayItem/payitem';
import XPay from 'react-native-puti-pay';
import Alert from '../components/Dialog/Alert';

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
    var targetHeight = targetWidth * originHeight / originWidth
    return (
        <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
    )
}

class IssuePayment extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            code: '',
            index: 0,
            mode: 'alipay',
            showMessage: false,
            message: ''
        }
        this.pinInput = React.createRef();
    }

    async componentDidMount() {
        const { token, getActiveList, getUser } = this.props;
        await getActiveList(token);
        await getUser(token);
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
        const { token, actives, getUser } = this.props;
        const { index, mode } = this.state;
        const order = actives[index].order_no;
        // const order = actives[0].order_no;

        try {
            const credit = await PayApi.appPay(token, order, mode);
            console.log('IssuePayment.handlePay: ', credit);
            await this.pay(credit, mode);
            await getUser(token);
            Actions.ChargeDetail({
                mode,
                amount: actives[index].amount
            });
        } catch (error) {
            console.log('IssuePayment.Pay: ', error);
            this.setState({ showMessage: true, message: '支付失败' });
        }
    }

    render() {
        const { mode, actives } = this.props;
        const { index, showMessage, message } = this.state;
        const title = (mode === 'alipay') ? '支付宝支付' : '微信支付';
        return (
            <View style={styles.root}>
                <HeaderBar title={'提交订单'} />
                <ScrollView>
                    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                        {/* <Image source={chargeSticker} style={{width:screenWidth-40,height:(screenWidth-40)/3,resizeMode:'stretch'}}></Image> */}
                        <ResponsiveImage uri={chargeSticker} targetWidth={screenWidth - 40} originWidth={642} originHeight={224} />
                    </View>
                    <View>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                            {actives && actives.map((item, idx) => (
                                <TouchableOpacity activeOpacity={0.6} key={item.id} onPress={() => this.setState({ index: idx })}>
                                    <View style={styles.chargeBack}>
                                        <View>
                                            <Text style={{ color: 'white', fontSize: 24 }}>
                                                {item.amount}
                                                <Text style={{ fontSize: 16 }}> 元</Text>
                                            </Text>
                                            <Text style={{ color: 'white', fontSize: 14, textAlign: 'left' }}>{item.name}</Text>
                                        </View>
                                        {index === idx && <Image source={check} style={{ ...styles.badge, width: 25, height: 25 }} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View>
                        <PayItem
                            icon={weixinIcon}
                            text={'微信支付'}
                            handlePress={() => this.setState({ mode: 'weixin' })}
                            active={this.state.mode === 'weixin'}
                        />
                        <PayItem
                            icon={alipayIcon}
                            text={'支付宝支付'}
                            handlePress={() => this.setState({ mode: 'alipay' })}
                            active={this.state.mode === 'alipay'}
                        />
                    </View>
                    <View style={{ height: 20 }} />
                    <WideButton title='确认购买' handleClick={this.handlePay} />
                    <View style={{ height: 15 }}></View>
                </ScrollView>
                <Alert
                    open={showMessage}
                    title={'错误'}
                    content={message}
                    handleOK={() => this.setState({ showMessage: false })}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    actives: state.pay.gifts
})

const mapDispatchToProps = dispatch => ({
    getActiveList: (token) => dispatch(PayAction.getActiveList(token)),
    getUser: (token) => dispatch(AuthAction.getUser(token))
});

export default IssuePayment = connect(mapStateToProps, mapDispatchToProps)(IssuePayment);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainPart: {
        backgroundColor: 'white',
        // marginHorizontal: 15,
        marginTop: 15
    },
    chargeBack: {
        width: screenWidth / 2 - 30,
        height: 80,
        margin: 10,
        backgroundColor: commonColors.chargeBack,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    badge: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    paymentMode: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
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
    }
})