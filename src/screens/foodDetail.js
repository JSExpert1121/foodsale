import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    Modal,
    TouchableOpacity,
} from 'react-native'
import { connect } from "react-redux";
import { noUser, cart, cartNumberPad, closeIcon } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header';
import WideButton from '../components/Button/WideButton';
import FoodItem from '../components/Food/fooditem';
import * as FoodAction from '../store/food/actions';
import * as OrderAction from '../store/order/actions';
import { getDistanceFromLatLonInKm } from '../helpers/geolocation';
import OrderApi from '../service/order';


const FoodReview = (props) => {
    const { comment } = props;
    const source = comment.images[0] ? {
        uri: comment.images[0].url
    } : noUser;

    return (
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1 }}>
                <View style={{ height: 6 }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Image source={source} style={{ width: 44, height: 44, borderRadius: 22 }} />
                    <View style={{ width: 10 }} />
                    <View style={{ flex: 1, paddingVertical: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={[commonStyles.accentFont, { fontSize: 14 }]}>{comment.comment_user}</Text>
                            <View style={{ flex: 1 }} />
                            <Text style={[commonStyles.contentFont, { fontSize: 14 }]}>{comment.comment_date}</Text>
                        </View>
                        <Text style={[commonStyles.contentFont, { fontSize: 14, marginTop: 3 }]}>{comment.comment}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

class FoodDetail extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            showOrderList: false,
            showModal: false
        }
    }

    componentDidMount() {
        const { id, foodId, getFoodDetail, getFoodComments, token } = this.props;
        getFoodDetail(token, id);
        getFoodComments(token, foodId, 0, 20);
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

    renderModal() {
        const { detail, simpleOrder } = this.props;
        const item = detail;
        return (
            <View style={{ height: '100%', position: 'absolute', width: '100%', bottom: 50, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ showOrderList: false })} style={{ flex: 1, width: '100%', height: 300, zIndex: 14, alignItems: 'center' }} />
                <View style={{ backgroundColor: commonColors.khaki, width: '100%', alignItems: 'center' }}><Text style={[commonStyles.contentFont, { fontSize: 14 }]}>已优惠2元</Text></View>
                <View style={{ paddingLeft: 15, paddingVertical: 20, width: '100%', backgroundColor: 'white' }}><Text style={[commonStyles.contentFont, { fontSize: 14 }]}>已选产品</Text></View>
                <FoodItem
                    starCnt={item.food.spicy}
                    name={item.food.name}
                    price={item.sale_price}
                    key={item.id}
                    image={item.food.images[0].thumb_url}
                    handleIncrease={() => this.increaseFood(item)}
                    handleDecrease={() => this.decreaseFood(item)}
                    orderCount={simpleOrder[item.id] ? simpleOrder[item.id].count || 0 : 0}
                    addable={true}
                />

                <View style={{ backgroundColor: "white", height: 40, width: '100%' }} />
            </View>
        )
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
        const { detail, comments, current, city, location, review } = this.props;
        const lat = city ? city.lat : location.lat;
        const lng = city ? city.lng : location.lng;
        return (
            <View style={styles.root}>
                <HeaderBar title={'菜品详细'} />
                {detail && (
                    <>
                        <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false}>
                            <ImageBackground source={{ uri: detail.food.images[0].url }} style={styles.bannerContainer} />
                            <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={styles.foodTitle}>{detail.food.name}</Text>
                                    <View style={{ height: 5 }} />
                                    <Text style={styles.foodSubTitle}>{detail.food.ingredient}</Text>
                                    <View style={{ height: 5 }} />
                                    <Text style={{ fontSize: 18, color: 'red' }}>¥ {detail.sale_price}</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                                {detail.allow_sale && (
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => { this.setState({ showOrderList: true }) }} style={[styles.cartButton]}>
                                        <Text style={styles.buttonText}>加入购物车</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={{ width: '100%', height: 7, backgroundColor: commonColors.mildGrey }}></View>
                            <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 18, color: '#333333', marginLeft: 7 }}>{"产品详情"}</Text>
                                    <View style={{ height: 6 }}></View>
                                    <Text style={{ ...commonStyles.contentFont, fontSize: 12 }}>
                                        {detail.food.description}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ width: '100%', height: 7, backgroundColor: commonColors.mildGrey }}></View>
                            <View style={styles.reviewHeaderContainer}>
                                <Text style={{ fontSize: 18, color: '#333333' }}>餐品评价</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{ fontSize: 14, color: '#666666' }}>{detail.food.comments_count}条评论</Text>
                            </View>
                            {comments && comments.length > 0 && (
                                <>
                                    {
                                        comments.map(comment => <FoodReview key={comment.id} comment={comment} />)
                                    }
                                </>
                            )}
                            <View style={{ height: 90 }}></View>
                        </ScrollView>
                        {this.state.showOrderList && this.renderModal()}
                        {review || this.renderOrder()}
                    </>
                )}

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
    token: state.auth.token,
    current: state.user.current,
    city: state.user.city,
    location: state.user.location,
    detail: state.food.detail,
    comments: state.food.comments,
    coupon: state.order.coupon,
    simpleOrder: state.order.simpleOrder,
})

const mapDispatchToProps = dispatch => ({
    getFoodDetail: (token, id) => dispatch(FoodAction.getFoodDetail(token, id)),
    increaseFood: (id, name, url, price) => dispatch(OrderAction.increaseFood(id, name, url, price)),
    decreaseFood: id => dispatch(OrderAction.decreaseFood(id)),
    getFoodComments: (token, id, start, size) => dispatch(FoodAction.getFoodComments(token, id, start, size)),
    createSuccess: data => dispatch(OrderAction.createSuccess(data)),
    resetShopping: () => dispatch(OrderAction.resetShopping())
});


export default FoodDetail = connect(mapStateToProps, mapDispatchToProps)(FoodDetail);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
    },
    bannerContainer: {
        width: screenWidth,
        height: screenHeight / 3
    },
    cartButton: {
        backgroundColor: commonColors.malachite,
        width: 120,
        height: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: commonStyles.buttonTextFont,
        color: 'white'
    },
    foodTitle: {
        fontSize: 18, color: "#222222", fontWeight: 'bold'
    },
    plusContainer: {
        width: 30,
        height: 30,

    },
    orderItem: { width: '100%', height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 5, paddingVertical: 10 },
    foodSubTitle: { fontSize: 14, color: 'grey' },
    reviewHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    specItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 22
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