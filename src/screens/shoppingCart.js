import React, { PureComponent } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    Switch
} from 'react-native';
import { connect } from "react-redux";
import { stick2, mapPin, closeIcon } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header';
import FoodOrderItem from '../components/Food/foodorderitem';
import WideButton from '../components/Button/WideButton';
import * as OrderAction from '../store/order/actions';
import * as FoodAction from '../store/food/actions';
import OrderApi from '../service/order';
import { getDistanceFromLatLonInKm } from '../helpers/geolocation';


class ShoppingCart extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showOrderList: false,
            showModal: false,
            discount: true,
            change: true,
            showMessage: false
        }
    }

    getOrderInfo = () => {
        const { token, simpleOrder, getAvailableCoupons, getAvailableFulloffs, setCoupon } = this.props;
        const items = Object.keys(simpleOrder).map(key => ({
            id: Number.parseInt(key),
            quantity: simpleOrder[key].count
        }));

        setCoupon(undefined);
        getAvailableCoupons(token, items);
        getAvailableFulloffs(token, items);
    }

    componentDidMount() {
        console.log('Payment.CDM: ');

        const { token, simpleOrder, getAvailableCoupons, getAvailableFulloffs, setCoupon } = this.props;
        const items = Object.keys(simpleOrder).map(key => ({
            id: Number.parseInt(key),
            quantity: simpleOrder[key].count
        }));

        setCoupon(undefined);
        getAvailableCoupons(token, items);
        getAvailableFulloffs(token, items);
    }

    handlePay = () => {
        const { simpleOrder } = this.props;
        if (Object.keys(simpleOrder).length === 0) return;

        this.setState({ showModal: true });
    }

    confirm = async () => {
        this.setState({ showModal: false });
        const { simpleOrder, coupon, token, createSuccess, resetShopping } = this.props;
        const items = Object.keys(simpleOrder).map(key => ({
            id: Number.parseInt(key),
            quantity: simpleOrder[key].count
        }));

        try {
            const data = await OrderApi.create(token, items, coupon);
            createSuccess(data);
            resetShopping();

            Actions.InstantOrder();
        } catch (error) {
            console.log('ShoppingCart.confirm: ', error);
            this.setState({ showMessage: true });
        }
    }

    increaseFood = (key) => {
        const { token, simpleOrder, getAvailableCoupons, getAvailableFulloffs, setCoupon } = this.props;
        // console.log('ShoppingCart.increaseFood: ', key);
        this.props.increaseFood(key, simpleOrder[key].name, simpleOrder[key].url, simpleOrder[key].price);
        const items = Object.keys(simpleOrder).map(id => ({
            id: Number.parseInt(id),
            quantity: (id === key) ? simpleOrder[id].count + 1 : simpleOrder[id].count
        }));

        setCoupon(undefined);
        getAvailableCoupons(token, items);
        getAvailableFulloffs(token, items);
    }

    decreaseFood = (key) => {
        const { token, simpleOrder, getAvailableCoupons, getAvailableFulloffs, setCoupon } = this.props;
        // console.log('ShoppingCart.decreaseFood: ', key);
        this.props.decreaseFood(key);
        const items = Object.keys(simpleOrder).map(id => ({
            id: Number.parseInt(id),
            quantity: (id === key) ? simpleOrder[id].count - 1 : simpleOrder[id].count
        })).filter(item => item.quantity !== 0);

        setCoupon(undefined);
        getAvailableCoupons(token, items);
        getAvailableFulloffs(token, items);
    }

    renderStick() {
        return (
            <View style={{ paddingHorizontal: 15 }}>
                <ImageBackground source={stick2} style={styles.stick2Container}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 8, color: 'white' }}>优惠多多  好礼送下听</Text>
                        <Text style={{ fontSize: 16, color: 'white' }}>充 值 有 礼</Text>
                    </View>
                    <View style={{ width: '20%' }} />
                    <View style={{ flex: 1 }}>
                        <LinearGradient
                            colors={['#f44242', '#f47142']}
                            start={[1, 0]}
                            end={[1, 1]}
                            style={{ paddingLeft: 10 }}
                        >
                            <Text style={{ fontSize: 8, color: 'white' }}>充 200 送 200</Text>
                        </LinearGradient>
                        <View style={{ height: 3 }} />
                        <LinearGradient
                            colors={['#f44242', '#f47142']}
                            start={[1, 0]}
                            end={[1, 1]}
                            style={{ paddingLeft: 10 }}
                        >
                            <Text style={{ fontSize: 8, color: 'white' }}>充 100 送 60</Text>
                        </LinearGradient>
                    </View>
                    <View style={{ flex: 1 }} />
                </ImageBackground>
            </View>
        )
    }

    getSelectedCoupon = () => {
        const { availables, coupon } = this.props;
        const selected = availables.filter(item => item.uid === coupon);
        if (selected && selected[0]) {
            return selected[0];
        }
        return null;
    }

    getFullOffAmount = () => {
        const { fulloffs } = this.props;
        return fulloffs ? fulloffs.off_amount ? fulloffs.off_amount : 0 : 0;
    }

    renderOptions() {
        const { change } = this.state;
        const { availables, user } = this.props;
        const couponCount = availables ? availables.length : 0;
        const fulloff = this.getFullOffAmount();
        let couponText = `${couponCount}张可用`;

        const selectedCoupon = this.getSelectedCoupon();
        if (selectedCoupon) {
            couponText = selectedCoupon.name;
        }

        return (
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ height: 5 }} />
                <View style={[styles.optionContainer]}>
                    <Text style={{ fontSize: 14 }}>使用优惠券</Text>
                    <View style={{ flex: 1 }} />
                    <View style={{ color: '#03db59', border: '1px solid #03db59', paddingVertical: 3, paddingHorizontal: 10 }}>
                        <Text style={{ color: '#03db59' }}>
                            {couponText}
                        </Text>
                    </View>
                    <View style={{ width: 10 }} />
                    {/*<Text style={{ color: 'red', fontSize: 18, textAlign: 'right' }}> ¥ {fulloff}</Text>*/}
                    <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.CouponAvailable()}>
                        <Text style={{ color: '#666', fontSize: 18, textAlign: 'right', paddingLeft: 10 }}> > </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={{ fontSize: 14 }}>满减优惠</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ color: 'red', fontSize: 18, textAlign: 'right' }}>- ¥ {fulloff}</Text>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={{ fontSize: 14 }}>余额支付</Text>
                    <View style={{ flex: 1 }} />
                    <Switch value={change} onValueChange={(value) => this.setState({ change: value })}></Switch>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={{ fontSize: 14, marginRight: 30 }}>{`账户余额     ${user.balances} ¥`}</Text>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.chargeButton}
                        onPress={() => { Actions.Charge() }}
                    >
                        <Text style={{ color: 'black' }}>立即充值</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 40 }} />
            </View>
        )
    }

    render() {
        const { current, simpleOrder, city, location } = this.props;
        const lat = city ? city.lat : location.lat;
        const lng = city ? city.lng : location.lng;
        const fulloff = this.getFullOffAmount();
        const coupon = this.getSelectedCoupon();

        let total = 0;
        for (let key in simpleOrder) {
            total += simpleOrder[key].count * simpleOrder[key].price;
        }
        total -= fulloff;
        if (coupon) total -= coupon.face_value;
        if (total < 0) total = 0;

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar title={'待支付'} />
                <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false}>
                    <View style={styles.infoBar}><Text style={[{ fontSize: 14, color: 'red' }]}>订购餐品在售餐前给予退换，超时不做退换，谢谢</Text></View>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={mapPin} style={{ width: 16, height: 20, resizeMode: 'contain' }} />
                                <View style={{ width: 3 }} />
                                <Text style={styles.foodTitle}>{"取餐地址"}</Text>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ height: 4 }} />
                            <Text style={styles.foodTitle}>{current.name}</Text>
                            <View style={{ height: 5 }} />
                            <Text style={styles.foodSubTitle}>{current.state.name + current.city.name + current.area.name + current.address}</Text>
                            <View style={{ height: 5 }} />
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>

                    <View style={{ flex: 1 }}>
                        {
                            Object.keys(simpleOrder).map(key => (
                                <FoodOrderItem
                                    key={key}
                                    name={simpleOrder[key].name}
                                    price={simpleOrder[key].price}
                                    count={simpleOrder[key].count}
                                    image={simpleOrder[key].url}
                                    handleIncrease={() => this.increaseFood(key)}
                                    handleDecrease={() => this.decreaseFood(key)}
                                />
                            ))
                        }
                    </View>
                    <View style={{ height: 7 }}></View>
                    {this.renderStick()}
                    {this.renderOptions()}
                    <View style={{ height: 50 }} />
                </ScrollView>

                <View>
                    <View style={{ position: 'absolute', bottom: 0, height: 50, zIndex: 5, backgroundColor: '#666666', width: '100%', flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '70%', height: 50, backgroundColor: '#666666', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', marginLeft: 20, fontSize: 18 }}>实付款：¥{total}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.handlePay}
                            style={{ width: '30%', height: 50, backgroundColor: '#03db59', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>立即下单</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    visible={this.state.showModal}
                    transparent={true}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={{ width: '80%', height: '30%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[{ fontSize: 14 }, commonStyles.contentFont]}>
                                您正在 {current.name}
                            </Text>
                            <Text style={[{ fontSize: 14 }, commonStyles.contentFont]}>
                                距离您现在位置{getDistanceFromLatLonInKm(lat, lng, parseFloat(current.lat), parseFloat(current.lng)).toFixed(2)} 公里
                            </Text>
                            <Text style={[{ fontSize: 14, marginBottom: 20 }, commonStyles.contentFont]}>
                                您确定在此台售卖机位置购买吗？
                            </Text>
                            <WideButton title='确认购买' handleClick={this.confirm} style={{ marginLeft: 0 }} />
                        </View>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { this.setState({ showModal: false }) }}>
                            <Image source={closeIcon} style={{ width: 40, height: 40, margin: 20 }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.showMessage}
                    transparent={true}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={{ width: '80%', height: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, ...commonStyles.contentFont, paddingTop: 12 }}>
                                下单失败
                            </Text>
                            <WideButton title='确认' handleClick={() => this.setState({ showMessage: false })} style={{ marginLeft: 0 }} />
                        </View>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.setState({ showMessage: false })}>
                            <Image source={closeIcon} style={{ width: 40, height: 40, margin: 20 }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    current: state.user.current,
    token: state.auth.token,
    city: state.user.city,
    location: state.user.location,
    availables: state.order.coupons,
    coupon: state.order.coupon,
    fulloffs: state.order.fulloff,
    simpleOrder: state.order.simpleOrder
});

const mapDispatchToProps = dispatch => ({
    getFoodDetail: (token, id) => dispatch(FoodAction.getFoodDetail(token, id)),
    getAvailableCoupons: (token, items) => dispatch(OrderAction.getAvailableCoupons(token, items)),
    getAvailableFulloffs: (token, items) => dispatch(OrderAction.getAvailableFulloffs(token, items)),
    increaseFood: (id, name, url, price) => dispatch(OrderAction.increaseFood(id, name, url, price)),
    decreaseFood: id => dispatch(OrderAction.decreaseFood(id)),
    setCoupon: uid => dispatch(OrderAction.toggleCoupon(uid)),
    createSuccess: data => dispatch(OrderAction.createSuccess(data)),
    resetShopping: () => dispatch(OrderAction.resetShopping())
})

export default ShoppingCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    foodTitle: {
        fontSize: 18, color: "#222222", fontWeight: 'bold'
    },
    chargeButton: {
        marginLeft: 10,
        width: 100,
        height: 40,
        backgroundColor: commonColors.malachite,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderItem: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 5,
        paddingVertical: 10
    },
    foodSubTitle: {
        fontSize: 14,
        color: 'grey'
    },
    infoBar: {
        backgroundColor: commonColors.khaki,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },
    stick2Container: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 3
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
    }
})