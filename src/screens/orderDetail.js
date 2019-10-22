import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
import { wancan, ringIcon, qrIcon } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from './header'
import * as commonColors from "../styles/colors";
import QRCode from 'react-native-qrcode-svg';
import * as OrderAction from '../store/order/actions';
import { Actions } from 'react-native-router-flux';


const FoodItem = ({ item, expired, paid, picking, handleSelect }) => {
    const { final_amount, food_name, food } = item;
    return (
        <TouchableOpacity
            style={styles.foodItem}
            onPress={handleSelect}
        >
            <Image source={{ uri: food.images[0].thumb_url }} style={styles.itemImageContainer} />
            <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 16, color: commonColors.accentColor }}> {food_name}</Text>
                <View style={{ height: 3 }} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>
                        {paid}
                        {expired}
                        {picking}
                    </Text>
                </View>
                <View style={{ height: 3 }} />
                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>总价 ¥ {final_amount}</Text>
            </View>
            <View style={{ flex: 1 }} />
        </TouchableOpacity>
    )
}

class Find extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            mode: 'buy',
        }
    }

    handleSelect = (item) => {
        Actions.FoodDetail({ id: item.menu_item_id, foodId: item.id });
    }

    render() {
        const { orderDetail, noQR } = this.props;
        if (!orderDetail) {
            return (
                <View style={styles.root}>
                    <HeaderBar title={'订单详情'} />
                </View>
            );
        }

        console.log('==================', orderDetail.code);
        const payTime = orderDetail.paid_time;
        let pickingTime = undefined;
        let payingTime = undefined;
        const startTime = orderDetail.start_pick_time;
        const endTime = orderDetail.expired_time;
        const expired = orderDetail.expired_pay_time && `过期时间: ${orderDetail.expired_pay_time}`;
        if (payTime) {
            payingTime = `支付时间: ${payTime.slice(0, 4)}年 ${payTime.slice(5, 7)}月 ${payTime.slice(8, 10)}日 ${payTime.slice(11, 13)}:${payTime.slice(14, 16)}`
        } else if (startTime && endTime) {
            pickingTime = `取餐时间: ${startTime.slice(0, 4)}年 ${startTime.slice(5, 7)}月 ${startTime.slice(8, 10)}日 ${startTime.slice(11, 13)}:${startTime.slice(14, 16)}-${endTime.slice(11, 13)}:${endTime.slice(14, 16)}`;
        }

        return (
            <View style={styles.root}>
                <HeaderBar title={'订单详情'} />
                <ScrollView>
                    <View style={{ height: 10, backgroundColor: 'white' }} />
                    {orderDetail.items.map(item => (
                        <FoodItem
                            key={item.id}
                            item={item}
                            picking={pickingTime}
                            expired={expired}
                            paid={payingTime}
                            handleSelect={() => this.handleSelect(item)}
                        />
                    ))}
                    <View style={{ padding: 20, backgroundColor: "white" }}>
                        {!payTime && !noQR && (
                            <React.Fragment>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={qrIcon}></Image>
                                    <View style={{ width: 10 }}></View>
                                    <Text style={{ fontSize: 16 }}>取餐吗</Text>
                                    <View style={{ flex: 1 }}></View>
                                </View>

                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20, height: 168 }}>
                                    <QRCode
                                        value={orderDetail.code}
                                        style={{ overflow: 'hidden' }}
                                        size={160}
                                    // backgroundColor='black'
                                    // fgColor='white'
                                    />
                                </View>
                            </React.Fragment>
                        )}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={ringIcon}></Image>
                            <View style={{ width: 10 }}></View>
                            <Text style={{ fontSize: 16 }}>温馨提示</Text>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <Text style={{ fontSize: 16, color: commonColors.contentColor, paddingLeft: 40 }}>
                            {payTime && payingTime}
                            {pickingTime}
                            {expired}
                        </Text>
                        <Text style={{ fontSize: 16, color: commonColors.contentColor, paddingLeft: 40 }}>{'订购餐品在售餐前给予退换，超时不做退换，谢谢！'}</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 1 }}></View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    dinings: state.order.dinings,
    // diningDetail: state.order.diningDetail,
});

const mapDispatchToProps = dispatch => ({
    getDiningDetail: (token, id) => dispatch(OrderAction.getDiningDetail(token, id))
})

export default Find = connect(mapStateToProps, mapDispatchToProps)(Find);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemImageContainer: {
        width: 80,
        height: 70,
        marginLeft: 15
    },
    foodItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
})