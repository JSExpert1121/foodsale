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
import { wancan } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import HeaderBar from './header';
import MyNavigator from './tabNavigator'
import * as commonColors from "../styles/colors";
import * as OrderAction from '../store/order/actions';


const OrderItem = ({ item, handleSelect, handlePay }) => {
    const { allow_pick, is_expired, is_picked, expired_time, picked_time, name, total_amount } = item;
    const color = allow_pick ? commonColors.limeGreen : is_expired ? commonColors.yellow : commonColors.gray9;
    const timeLabel = is_picked ? '下单时间' : '过期时间';
    const time = is_picked ? picked_time : expired_time;
    const btnLabel = allow_pick ? '领取' : is_expired ? '已过期' : '已领取';

    return (
        <TouchableOpacity onPress={handleSelect} style={styles.foodItem}>
            <Image source={wancan} style={styles.itemImageContainer} />
            <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 16, color: commonColors.accentColor }}> {name}</Text>
                <View style={{ height: 3 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>{timeLabel + ': ' + time.slice(0, 16)}</Text>
                </View>
                <View style={{ height: 3 }} />
                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>总价 ¥ {parseFloat(total_amount).toFixed(2)}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={allow_pick ? handlePay : undefined}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 30, borderRadius: 3, backgroundColor: color }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>{btnLabel}</Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

class Order extends PureComponent {

    componentDidMount() {
        const { token, getDiningCodes } = this.props;
        getDiningCodes(token);
    }

    handleSelect = item => {
        // Actions.OrderDetail({ orderDetail: item });
    }

    handlePay = item => {
        Actions.OrderDetail({ orderDetail: item });
        // Actions.InstantOrder({ existingOrder: item });
    }

    render() {
        const { dinings } = this.props;
        dinings && console.log(dinings.length);
        return (
            <View style={styles.root}>
                <HeaderBar title={'点餐'} />
                <ScrollView style={{ backgroundColor: "white", paddingVertical: 15, flex: 1 }}>
                    {dinings && dinings.map(item => (
                        <OrderItem
                            key={item.id}
                            item={item}
                            handleSelect={() => this.handleSelect(item)}
                            handlePay={() => this.handlePay(item)}
                        />
                    ))}
                </ScrollView>
                <MyNavigator mode={1} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    dinings: state.order.dinings,
});

const mapDispatchToProps = dispatch => ({
    getDiningCodes: token => dispatch(OrderAction.getDiningCodes(token))
});

export default Order = connect(mapStateToProps, mapDispatchToProps)(Order);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemImageContainer: {
        width: 80,
        height: 70,
    },
    foodItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    },
})