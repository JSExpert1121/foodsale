import React from 'react';
import { connect } from "react-redux";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Modal,
    Image,
    Text
} from 'react-native';
import { cart, cartNumberPad, closeIcon } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from './header'
import { Actions } from 'react-native-router-flux';
import * as FoodAction from '../store/food/actions';
import * as OrderAction from '../store/order/actions';
import FoodItem from '../components/Food/fooditem';
import WideButton from '../components/Button/WideButton';
import * as commonStyles from "../styles/styles";
import { getDistanceFromLatLonInKm } from '../helpers/geolocation';
import OrderApi from '../service/order';
import Alert from '../components/Dialog/Alert';

class Breakfast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            showModal: false,
            showMessage: false,
            message: ''
        }
    }

    componentDidMount() {
        const { getSaleable, token, catId, current, date } = this.props;
        console.log('Breackfast.CDM: ', catId);

        // const date = new Date();
        getSaleable(token, current.id, catId, date);
    }

    selectFood = (item) => {
        console.log('Breakfast.selectFood: ');
        Actions.FoodDetail({ id: item.id, foodId: item.food.id });
    }

    increaseFood = (item) => {
        console.log('Breakfast.increaseFood: ', item);
        this.props.increaseFood(item.id, item.food.name, item.food.images[0].url, item.sale_price);
    }

    decreaseFood = (item) => {
        console.log('Breakfast.decreaseFood: ', item);
        this.props.decreaseFood(item.id);
    }

    shoppingCart = () => {
        const { simpleOrder } = this.props;
        let count = 0;
        for (let item in simpleOrder) {
            count += simpleOrder[item].count;
        }

        if (count > 0) {
            Actions.ShoppingCart();
        }
    }

    handlePay = () => {
        const { simpleOrder } = this.props;
        let count = 0;
        for (let item in simpleOrder) {
            count += simpleOrder[item].count;
        }

        if (count > 0) {
            this.setState({ showModal: true });
        }
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
            this.setState({ showMessage: true, message: '支付失败' });
        }
    }

    renderOrder() {
        const { simpleOrder } = this.props;
        let count = 0;
        for (let item in simpleOrder) {
            count += simpleOrder[item].count;
        }

        return (
            <View>
                <TouchableOpacity onPress={this.shoppingCart} style={{ position: 'absolute', bottom: 0, left: 20, zIndex: 7, backgroundColor: 'white', width: 90, height: 90, alignItems: 'center', justifyContent: 'center', borderRadius: 50, borderColor: 'green', borderWidth: 1 }}>
                    <ImageBackground source={cart} style={{ width: 60, height: 60 }}>
                        {count > 0 && (
                            <ImageBackground source={cartNumberPad} style={{ position: 'absolute', right: -10, top: 0, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>{count}</Text>
                            </ImageBackground>
                        )}
                    </ImageBackground>
                </TouchableOpacity>
                <View
                    style={{ position: 'absolute', bottom: 0, height: 50, zIndex: 5, backgroundColor: '#666666', width: '100%', flexDirection: 'row', width: '100%' }}
                    onPress={this.handlePay}
                >
                    <View style={{ width: '70%', height: 50, backgroundColor: '#666666' }}></View>
                    <TouchableOpacity onPress={this.handlePay} style={{ width: '30%', height: 50, backgroundColor: '#03db59', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>立即下单</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { food, title, simpleOrder, current, city, location } = this.props;
        const { showMessage, message } = this.state;
        const lat = city ? city.lat : location.lat;
        const lng = city ? city.lng : location.lng;
        return (
            <View style={{ flex: 1 }}>
                <HeaderBar title={title} />
                <ScrollView style={styles.flex}>
                    <View style={{ flex: 1 }}>
                        {
                            food && food.map(item => (
                                <FoodItem
                                    starCnt={item.food.spicy}
                                    name={item.food.name}
                                    price={item.sale_price}
                                    key={item.id}
                                    image={item.food.images[0].thumb_url}
                                    handleIncrease={() => this.increaseFood(item)}
                                    handleDecrease={() => this.decreaseFood(item)}
                                    orderCount={simpleOrder[item.id] ? simpleOrder[item.id].count || 0 : 0}
                                    handleSelect={() => this.selectFood(item)}
                                    addable={true}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
                {this.renderOrder()}
                <Alert
                    open={showMessage}
                    title={'错误'}
                    content={message}
                    handleOK={() => this.setState({ showMessage: false })}
                />
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
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    city: state.user.city,
    location: state.user.location,
    current: state.user.current,
    food: state.food.food,
    coupon: state.order.coupon,
    simpleOrder: state.order.simpleOrder
});

const mapDispatchToProps = dispatch => ({
    getSaleable: (token, outlet, catId, date) => dispatch(FoodAction.getSaleable(token, outlet, catId, date)),
    increaseFood: (id, name, url, price) => dispatch(OrderAction.increaseFood(id, name, url, price)),
    decreaseFood: id => dispatch(OrderAction.decreaseFood(id)),
    createSuccess: data => dispatch(OrderAction.createSuccess(data)),
    resetShopping: () => dispatch(OrderAction.resetShopping())
})

export default Breakfast = connect(mapStateToProps, mapDispatchToProps)(Breakfast);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
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