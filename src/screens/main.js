import React, { PureComponent } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
import {
    bannerBack, balloon, zaodian, categoryBackground, stick2, pin
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
// import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import MyNavigator from '../screens/tabNavigator'
import * as UserAction from '../store/user/actions';
import * as FoodAction from '../store/food/actions';
import * as OrderAction from '../store/order/actions';
import UserApi from '../service/user';
import { Menus } from '../common/categories';
import FoodItem from '../components/Food/fooditem';

class Main extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            error: '',
        }
    }

    async componentDidMount() {
        const { location, currentSuccess, getInterestFoods, getPopularFoods, getSalesTime, token, setOrderTime } = this.props;

        if (!location) {
            const location = await this.getLocation();
            location.latitude = 34.757975, location.longitude = 113.665412;
            this.props.setPosition(location.latitude, location.longitude);
        }

        const { data } = await UserApi.getCurrentNetwork(token);
        currentSuccess(data);
        if (!data) {
            Actions.NearCity();
            return;
        }

        getInterestFoods(token, data.id);
        getPopularFoods(token, data.id);
        getSalesTime(token);
        setOrderTime(Date, -1);
    }

    getPosition = () => new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition((info => {
            console.log(info);
            resolve(info);
        }), error => {
            reject(error);
        });
    });

    getLocation = async () => {
        try {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                console.log('Main.getLocation: Permission to access location was denied');
                this.setState({ error: "Permission to access location was denied" });
            }

            const { coords } = await this.getPosition();
            console.log('Main.getLocation: ', coords);
            return coords;
        } catch (error) {
            console.log('Main.getLocation: ', error, this.state.error);
            return {};
        }
    }

    gotoMap = () => {
        Actions.NearCity();
        // Actions.MapViewer();
    }

    selectFood = (item) => {
        console.log('Main.selectFood: ');
        Actions.FoodDetail({ id: item.id, foodId: item.food.id });
    }

    increaseFood = (item) => {
        console.log('Main.increaseFood: ', item);
        this.props.increaseFood(item.id, item.food.name, item.food.images[0].url, item.sale_price);
    }

    decreaseFood = (item) => {
        console.log('Main.decreaseFood: ', item);
        this.props.decreaseFood(item.id);
    }

    handleMenu = idx => {
        switch (idx) {
            case 0:
                Actions.SelectOrder();
                break;
            case 1:
                Actions.Special();
                break;
            case 2:
                console.log('You clicked 选材');
                break;
            default:
                break;
        }
    }

    handleTimePicked = cat => {
        const { setOrderTime } = this.props;
        setOrderTime(Date(), cat.id);
        Actions.Breakfast({ catId: cat.id, title: cat.name });
    }

    render() {
        const { interest, popular, time, simpleOrder, current } = this.props;
        const net = current ? current.name : '未选择';
        console.log('Main.Render: ', current);
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={bannerBack} style={styles.bannerContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginLeft: 25 }}>
                        <TouchableOpacity onPress={this.gotoMap}>
                            <Image source={balloon} style={styles.balloonContainer} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 16 }}>{net}</Text>
                    </View>
                </ImageBackground>
                <ScrollView style={styles.flex}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                        {
                            time && time.map(cat => (
                                <TouchableOpacity
                                    key={cat.id}
                                    onPress={() => this.handleTimePicked(cat)}
                                    style={styles.categoryItemContainer}
                                >
                                    <Image source={zaodian} style={styles.categoryPicture} />
                                    <Text style={{ textAlign: 'center' }}>{cat.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                        {
                            Menus.map((menu, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => this.handleMenu(index)}
                                    activeOpacity={0.6}
                                >
                                    <View style={styles.categoryMenuContainer} key={index}>
                                        <Image source={categoryBackground} style={styles.menuPicture} />
                                        <View style={{ position: 'absolute', left: 24, top: 12 }}>
                                            <Text style={{ fontSize: 14 }}>{menu.title}</Text>
                                            <View style={{ height: 5 }} />
                                            <Text style={{ fontSize: 10 }}>{menu.description}</Text>
                                        </View>
                                        <Text style={styles.cornerLabel}>{menu.corner}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.IssuePayment()}>
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
                    </TouchableOpacity>

                    <View style={{ paddingVertical: 10 }}><Text style={{ textAlign: 'center', fontSize: 16, color: 'grey' }}>-- 猜你喜欢 --</Text></View>
                    <View style={{ flex: 1 }}>
                        {
                            interest && interest.map(item => (
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
                        {
                            (!interest || interest.length === 0) && popular && popular.map(item => (
                                <FoodItem
                                    starCnt={item.spicy}
                                    name={item.name}
                                    price={''}
                                    key={item.id}
                                    image={item.images[0].thumb_url}
                                    addable={false}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
                <MyNavigator mode={0} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    current: state.user.current,
    interest: state.food.interest,
    popular: state.food.popular,
    time: state.food.time,
    location: state.user.location,
    simpleOrder: state.order.simpleOrder
});

const mapDispatchToProps = dispatch => ({
    currentSuccess: (data) => dispatch(UserAction.currentSuccess(data)),
    getInterestFoods: (token, outlet) => dispatch(FoodAction.getInterestFood(token, outlet)),
    getPopularFoods: (token, outlet) => dispatch(FoodAction.getPopularFood(token, outlet)),
    getSalesTime: (token) => dispatch(FoodAction.getSaleTime(token)),
    increaseFood: (id, name, url, price) => dispatch(OrderAction.increaseFood(id, name, url, price)),
    decreaseFood: id => dispatch(OrderAction.decreaseFood(id)),
    setPosition: (lat, lon) => dispatch(UserAction.setPosition(lat, lon)),
    setOrderTime: (date, id) => dispatch(OrderAction.setOrderTime(date, id)),
});

export default Main = connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    flex: {
        // flex: 1,
        backgroundColor: 'white',
    },
    bannerContainer: {
        width: screenWidth,
        height: screenHeight / 3
    },
    categoryItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    balloonContainer: {
        width: 20,
        height: 26,
        marginRight: 10
    },
    cornerLabel: {
        position: 'absolute', top: 8, right: 12, color: "white", fontSize: 10
    },
    categoryPicture: {
        width: 50,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 5
    },
    menuPicture: {
        width: screenWidth / 3 - 15,
        height: 70,
        marginBottom: 5,
        paddingHorizontal: 10,
        resizeMode: 'contain'
    },
    categoryMenuContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    stick2Container: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%',
        resizeMode: 'contain',
        flexDirection: 'row'
    },
})