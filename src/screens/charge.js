import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    ScrollView
} from 'react-native';
import { connect } from "react-redux";
import {
    chargeSticker, weixinIcon, alipayIcon
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import WideButton from '../components/Button/WideButton';
import HeaderBar from './header';
import * as PayAction from '../store/pay/actions';

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
    var targetHeight = targetWidth * originHeight / originWidth
    return (
        <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
    )
}

class Charge extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            showOrderList: false,
            showModal: false
        }
    }

    componentDidMount() {
        this.props.getActiveList(this.props.token);
    }

    render() {
        const { actives } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'充值'} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                        {/* <Image source={chargeSticker} style={{width:screenWidth-40,height:(screenWidth-40)/3,resizeMode:'stretch'}}></Image> */}
                        <ResponsiveImage uri={chargeSticker} targetWidth={screenWidth - 40} originWidth={642} originHeight={224} />
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {actives && actives.map((item, idx) => (
                            <View style={styles.chargeBack} key={item.id}>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 24 }}>
                                        {item.amount}
                                        <Text style={{ fontSize: 16 }}> 元</Text>
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 14, textAlign: 'left' }}>{item.name}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{ height: 25 }} />
                    <Text style={{ marginLeft: 30, fontSize: 18 }}>{'支付方式'}</Text>
                    <View style={{ height: 20 }} />
                    <View style={styles.paymentMode}>
                        <Image source={weixinIcon} style={{ width: 20, height: 20 }} />
                        <View style={{ width: 10 }} />
                        <Text style={{ fontSize: 18 }}>{'微信支付'}</Text>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={styles.paymentMode}>
                        <Image source={alipayIcon} style={{ width: 20, height: 20 }} />
                        <View style={{ width: 10 }} />
                        <Text style={{ fontSize: 18 }}>{'支付宝支付'}</Text>
                    </View>
                    <View style={{ height: 30 }} />
                    <WideButton title='立即充值' handleClick={() => { Actions.InstantCharge() }} />
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Text style={{ color: 'grey' }}>点击立即充值，表示统一<Text style={{ color: commonColors.limeGreen }}>《充值活动协议》</Text></Text>
                    </View>
                    {/* <View style={{ flex: 1 }}></View> */}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    user: state.auth.user,
    actives: state.pay.gifts
});

const mapDispatchToProps = (dispatch) => ({
    getActiveList: (token) => dispatch(PayAction.getActiveList(token)),
});


export default Charge = connect(mapStateToProps, mapDispatchToProps)(Charge);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white'
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
    paymentMode: { flexDirection: 'row', alignItems: 'center', marginLeft: 30 }
})