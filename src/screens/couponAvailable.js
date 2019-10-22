import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from './header'
import { couponBackground } from '../common/image';
import * as commonColors from "../styles/colors";
import * as OrderAction from '../store/order/actions';
import { Actions } from 'react-native-router-flux';


const CouponItem = ({ coupon, inUse, }) => {
    const start = coupon.start_date;
    const end = coupon.end_date;
    const desc = coupon.only_first_order ? '第一次可用' : '随时可用';
    const color = inUse ? 'grey' : commonColors.limeGreen;
    return (
        <ImageBackground source={couponBackground} style={styles.listItem} resizeMode='stretch'>
            <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 40, height: 25, backgroundColor: color, alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}>
                        <Text style={{ color: 'white' }}>满减</Text>
                    </View>
                    <View style={{ width: 20 }}></View>
                    <Text style={{ fontSize: 16, color: commonColors.gray9, fontWeight: 'bold' }}>{coupon.name}</Text>
                    <View style={{ flex: 1 }}></View>
                </View>
                <Text style={{ fontSize: 14, marginTop: 10, color: 'grey' }}>{`${start}至${end}`}</Text>
            </View>
            <View style={{ flex: 1 }}>
                {/* <Image source={failureStamp} style={{ position: 'absolute', top: 0, left: 0, width: 67, height: 50 }}></Image> */}
                <Text style={{ color, fontSize: 20 }}>
                    {'¥ '}
                    <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{coupon.face_value}</Text>
                </Text>
                <View style={{ height: 5 }}></View>
                <Text style={{ color, fontSize: 16 }}>{desc}</Text>
            </View>
        </ImageBackground>
    )
}


class CouponAvailable extends PureComponent {

    componentDidMount() {
        const { token, simpleOrder, getAvailableCoupons } = this.props;
        if (simpleOrder) {
            const items = Object.keys(simpleOrder).map(key => ({
                id: Number.parseInt(key),
                quantity: simpleOrder[key].count
            }));
            getAvailableCoupons(token, items);
        }
    }

    handleUse = uid => {
        const { toggleCoupon, simpleOrder } = this.props;
        if (simpleOrder) {
            toggleCoupon(uid);
            Actions.pop();
        }
    }

    render() {
        const { availables } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'不使用优惠券'} />
                <View style={{ height: 10, backgroundColor: 'transparent' }} />
                {
                    <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                        {availables && availables.map(coupon => (
                            <TouchableOpacity
                                key={coupon.uid}
                                activeOpacity={0.6}
                                onPress={() => this.handleUse(coupon.uid)}
                            >
                                <CouponItem key={coupon.uid} coupon={coupon} inUse={false} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                }
            </View >
        )
    }
}

const mapStateToProps = state => ({
    current: state.user.current,
    token: state.auth.token,
    availables: state.order.coupons,
    simpleOrder: state.order.simpleOrder
});

const mapDispatchToProps = dispatch => ({
    getAvailableCoupons: (token, items) => dispatch(OrderAction.getAvailableCoupons(token, items)),
    toggleCoupon: uid => dispatch(OrderAction.toggleCoupon(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponAvailable);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    listItem: {
        width: screenWidth - 10,
        height: 100,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    searchOption: {
        fontSize: 18,
        textAlign: 'center'
    }
})