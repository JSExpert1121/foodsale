import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { connect } from "react-redux";
import { cart, cartNumberPad, star, plus, minus } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import HeaderBar from './header';
import * as FoodAction from '../store/food/actions';
import * as OrderAction from '../store/order/actions';
import { formatDate } from '../helpers/dateformat';

const starArray = [
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
];

const SpecialItem = ({ item, handleSelect, addable, handleIncrease, handleDecrease, orderCount }) => {
    const { spicy, name } = item.food;
    const image = item.food.images[0].url;
    const price = item.sale_price;

    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.item} onPress={handleSelect}>
            <Image source={{ uri: image }} style={{ width: '100%', height: 160 }} />
            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                <View>
                    <Text> {name}</Text>
                    <View style={{ height: 8 }} />
                    <View style={{ flexDirection: 'row' }}>
                        {
                            starArray[spicy - 1].map((item, index) => (
                                <Image source={star} style={styles.starContainer} key={index} />
                            ))
                        }
                    </View>
                    <View style={{ height: 8 }} />
                    <Text style={{ color: 'red', fontSize: 18 }}> ¥ {price}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <View>
                    <View style={{ flex: 1 }}></View>
                    {addable && (
                        <View style={styles.orderRoot}>
                            {orderCount > 0 && (
                                <>
                                    <TouchableOpacity activeOpacity={0.6} onPress={handleDecrease}>
                                        <Image source={minus} style={styles.plusContainer} />
                                    </TouchableOpacity>
                                    <Text style={styles.count}> {orderCount} </Text>
                                </>
                            )}
                            <TouchableOpacity activeOpacity={0.6} onPress={handleIncrease}>
                                <Image source={plus} style={styles.plusContainer} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

class Find extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            mode: 'status',
        }
    }

    componentDidMount() {
        const { getSpecialFood, token, current } = this.props;
        getSpecialFood(token, current.id, formatDate(new Date()));
    }

    increaseFood = (item) => {
        console.log('FoodDetail.increaseFood: ', item);
        this.props.increaseFood(item.id, item.food.name, item.food.images[0].url, item.sale_price);
    }

    decreaseFood = (item) => {
        console.log('FoodDetail.decreaseFood: ', item);
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

    confirm = () => {
        this.setState({ showModal: false });
        Actions.InstantOrder();
    }

    selectFood = (item) => {
        console.log('Breakfast.selectFood: ');
        Actions.FoodDetail({ id: item.id, foodId: item.food.id });
    }

    renderOrder() {
        const { simpleOrder } = this.props;
        let count = 0;
        for (let item in simpleOrder) {
            count += simpleOrder[item].count;
        }

        return (
            <View style={{ height: 50 }}>
                <TouchableOpacity onPress={this.shoppingCart} style={{ position: 'absolute', bottom: 0, left: 20, zIndex: 7, backgroundColor: 'white', width: 90, height: 90, alignItems: 'center', justifyContent: 'center', borderRadius: 50, borderColor: 'green', borderWidth: 1 }}>
                    <ImageBackground source={cart} style={{ width: 60, height: 60 }}>
                        {count > 0 && (
                            <ImageBackground source={cartNumberPad} style={{ position: 'absolute', right: -10, top: 0, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>{count}</Text>
                            </ImageBackground>
                        )}
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0, height: 50, zIndex: 5, backgroundColor: '#666666', width: '100%', flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '70%', height: 50, backgroundColor: '#666666' }}></View>
                    <TouchableOpacity
                        style={{ width: '30%', height: 50, backgroundColor: '#03db59', alignItems: 'center', justifyContent: 'center' }}
                        onPress={this.handlePay}
                    >
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>立即下单</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { specials, simpleOrder } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'特色餐品'} />
                <ScrollView>
                    {specials.map(item => (
                        <SpecialItem
                            key={item.id}
                            item={item}
                            handleIncrease={() => this.increaseFood(item)}
                            handleDecrease={() => this.decreaseFood(item)}
                            orderCount={simpleOrder[item.id] ? simpleOrder[item.id].count || 0 : 0}
                            addable={true}
                            handleSelect={() => this.selectFood(item)}
                        />
                    ))}
                </ScrollView>

                {this.renderOrder()}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    current: state.user.current,
    specials: state.food.specials,
    simpleOrder: state.order.simpleOrder,
});

const mapDispatchToProps = dispatch => ({
    getSpecialFood: (token, outlet, date) => dispatch(FoodAction.getSpecialFood(token, outlet, date)),
    increaseFood: (id, name, url, price) => dispatch(OrderAction.increaseFood(id, name, url, price)),
    decreaseFood: id => dispatch(OrderAction.decreaseFood(id)),
});

export default Find = connect(mapStateToProps, mapDispatchToProps)(Find);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    orderRoot: {
        position: 'absolute',
        right: 10,
        bottom: 5,
        padding: 5,
        flexDirection: 'row'
    },
    plusContainer: {
        width: 30,
        height: 30,
    },
    starContainer: {
        width: 15,
        height: 15,
        marginHorizontal: 2
    },
    count: {
        fontSize: 24,
        width: 60,
        height: 30,
        textAlign: 'center'
    }
})