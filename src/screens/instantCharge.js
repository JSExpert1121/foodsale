import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from "react-redux";
import {
    uncheck, weixinIcon, alipayIcon, check
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header';
import WideButton from '../components/Button/WideButton';

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
    var targetHeight = targetWidth * originHeight / originWidth
    return (
        <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
    )
}


class InstantCharge extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 'weixin',
            showOrderList: false,
            showModal: false
        }
    }

    render() {
        const { user } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'提交订单'} />
                <ScrollView>
                    <View style={{ height: 25 }} />
                    <View style={{ justifyContent: 'center', alignItems: "center", marginVertical: 20 }}>
                        <Text style={[{ fontSize: 24 }, commonStyles.accentFont]}>剩余支付时间</Text>
                        <View style={{ width: 100, marginTop: 20, height: 30, backgroundColor: commonColors.limeGreen, alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}>
                            <Text style={{ color: "white" }}>03:00</Text>
                        </View>
                        <Text style={[{ fontSize: 24, color: 'red', margin: 10 }]}>¥ {user.balances}</Text>
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
                                this.state.selectedMode == 'weixin' ?
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
                                this.state.selectedMode == 'alipay' ?
                                    <Image source={check} style={{ width: 25, height: 25 }} /> :
                                    <Image source={uncheck} style={{ width: 25, height: 25 }} />
                            }
                            <View style={{ width: 30 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 40 }}></View>
                    <WideButton title='立即充值' handleClick={() => Actions.IssuePayment({ mode: this.state.selectedMode })} />
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ color: 'grey' }}>点击立即充值，表示统一<Text style={{ color: commonColors.limeGreen }}>《充值活动协议》</Text></Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({

});


export default InstantCharge = connect(mapStateToProps, mapDispatchToProps)(InstantCharge);

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
    paymentMode: { flexDirection: 'row', alignItems: 'center', marginLeft: 30 }
})