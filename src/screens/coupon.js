import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    ImageBackground
} from 'react-native';
import { closeSymbol } from '../common/image';
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from './header'
import { couponBackground } from '../common/image';
import * as commonColors from "../styles/colors";
import * as OrderAction from '../store/order/actions';
import * as UserAction from '../store/user/actions';
import * as AccountAction from '../store/accounts/actions';
import WideButton from '../components/Button/WideButton';
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


class Coupon extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            mode: props.simpleOrder ? 'notUsed' : 'assignable',
            showModal: false,
            current: -1,
        }
    }

    componentDidMount() {
        // const { token, simpleOrder, getAssignableCoupons, getAvailableCoupons } = this.props;
        const { token, simpleOrder, getCoupons, getAssignableCoupons, getAvailableCoupons, toggleCoupon } = this.props;
        getAssignableCoupons(token);
        if (simpleOrder) {
            const items = Object.keys(simpleOrder).map(key => ({
                id: Number.parseInt(key),
                quantity: simpleOrder[key].count
            }));
            getAvailableCoupons(token, items);
        } else {
            getCoupons(token, 0, 20, 'available');
            getCoupons(token, 0, 20, 'used');
            getCoupons(token, 0, 20, 'expired');
        }
    }

    handleAssign = id => {
        const { token, assignCoupon } = this.props;
        this.setState({ current: id, showModal: true });
        assignCoupon(token, id);
    }

    handleUse = uid => {
        const { toggleCoupon, simpleOrder } = this.props;
        if (simpleOrder) {
            toggleCoupon(uid);
            Actions.pop();
        }
    }

    assignCoupon = () => {
        const { token, assignCoupon } = this.props;
        const { current } = this.state;
        this.setState({ showModal: false });
        assignCoupon(token, current);
    }

    renderMode() {
        return (
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'assignable' }) }} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <View style={{ flex: 1 }} />
                    <Text style={[styles.searchOption, { color: this.state.mode == 'assignable' ? commonColors.limeGreen : commonColors.accentColor }]}>待领取</Text>
                    <View style={{ height: 5 }} />
                    {
                        this.state.mode == 'assignable' &&
                        <View style={{ height: 3, width: 60, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'notUsed' }) }} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <View style={{ flex: 1 }} />
                    <Text style={[styles.searchOption, { color: this.state.mode == 'notUsed' ? commonColors.limeGreen : commonColors.accentColor }]}>未使用</Text>
                    <View style={{ height: 5 }} />
                    {
                        this.state.mode == 'notUsed' &&
                        <View style={{ height: 3, width: 60, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'used' }) }} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <View style={{ flex: 1 }} />
                    <Text style={[styles.searchOption, { color: this.state.mode == 'used' ? commonColors.limeGreen : commonColors.accentColor }]}>已使用</Text>
                    <View style={{ height: 5 }} />
                    {
                        this.state.mode == 'used' &&
                        <View style={{ height: 3, width: 60, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'failure' }) }} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <View style={{ flex: 1 }} />
                    <Text style={[styles.searchOption, { color: this.state.mode == 'failure' ? commonColors.limeGreen : commonColors.accentColor }]}>已失败</Text>
                    <View style={{ height: 5 }} />
                    {
                        this.state.mode == 'failure' &&
                        <View style={{ height: 3, width: 60, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { coupons, assignables, simpleOrder, availables, coupon } = this.props;
        const usables = !!simpleOrder ? availables : !!coupons ? coupons.available : undefined;
        const used = coupons && coupons.used;
        const expired = coupons && coupons.expired;
        return (
            <View style={styles.root}>
                <HeaderBar title={'优惠券'} />
                <View style={{ height: 10, backgroundColor: 'transparent' }} />
                {this.renderMode()}
                <View style={{ height: 10, backgroundColor: 'transparent' }} />
                {
                    this.state.mode === 'assignable' && (
                        <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                            {assignables && assignables.map((coupon, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.6}
                                    onPress={() => this.handleAssign(coupon.id)}
                                >
                                    <CouponItem coupon={coupon} inUse={true} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )
                }
                {
                    this.state.mode === 'notUsed' && (
                        <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                            {usables && usables.map(coupon => (
                                <TouchableOpacity
                                    key={coupon.uid}
                                    activeOpacity={0.6}
                                    onPress={() => this.handleUse(coupon.uid)}
                                >
                                    <CouponItem key={coupon.uid} coupon={coupon} inUse={false} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )
                }
                {
                    this.state.mode === 'used' &&
                    <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                        {used && used.map(coupon => (
                            <CouponItem key={coupon.uid} coupon={coupon} inUse={true} />
                        ))}
                    </ScrollView>
                }
                {
                    this.state.mode === 'failure' &&
                    <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                        {expired && expired.map(coupon => (
                            <CouponItem key={coupon.uid} coupon={coupon} inUse={true} />
                        ))}
                    </ScrollView>
                }
                <Modal transparent={true} visible={this.state.showModal}>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: '70%', height: 160, marginTop: 150, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderBottomColor: 'green', borderBottomWidth: 1 }}>
                                <TouchableOpacity onPress={() => this.setState({ showModal: false })}>
                                    <Image source={closeSymbol} style={{ width: 12, height: 12, marginLeft: 15 }} />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>确定</Text>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ height: 10 }} />
                            <View style={{ textAlign: 'left', paddingTop: 10, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 14 }}>
                                    你确定领取优惠券吗？
                                </Text>
                            </View>
                            <WideButton title='确定' handleClick={this.assignCoupon} />
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
}

const mapStateToProps = state => ({
    current: state.user.current,
    token: state.auth.token,
    coupons: state.account.coupons,
    availables: state.order.coupons,
    assignables: state.user.coupons
});

const mapDispatchToProps = dispatch => ({
    getCoupons: (token, start_id, size, status) => dispatch(AccountAction.getCoupons(token, start_id, size, status)),
    getAvailableCoupons: (token, items) => dispatch(OrderAction.getAvailableCoupons(token, items)),
    getAssignableCoupons: (token) => dispatch(UserAction.getCoupons(token)),
    assignCoupon: (token, id) => dispatch(UserAction.assignCoupon(token, id)),
    toggleCoupon: uid => dispatch(OrderAction.toggleCoupon(uid)),
});

export default Coupon = connect(mapStateToProps, mapDispatchToProps)(Coupon);

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