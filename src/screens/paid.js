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
import HeaderBar from './header'
import * as commonColors from "../styles/colors";
import * as AccountAction from '../store/accounts/actions';

const OrderInfo = ({ item }) => {
    const { created_at, final_amount, name } = item;
    let pickingTime = undefined;
    if (created_at && created_at.length === 19) {
        pickingTime = `${created_at.slice(0, 4)}年 ${created_at.slice(5, 7)}月 ${created_at.slice(8, 10)}日 ${created_at.slice(11, 13)}:${created_at.slice(14, 16)}`;
    }

    return (
        <TouchableOpacity onPress={() => { Actions.OrderDetail({ orderDetail: item }) }} style={styles.foodItem}>
            <Image source={wancan} style={styles.itemImageContainer} />
            <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 16, color: commonColors.accentColor }}> {name}</Text>
                <View style={{ height: 3 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>{`下单时间 ${pickingTime}`}</Text>
                </View>
                <View style={{ height: 3 }} />
                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>总价 ¥ {final_amount}</Text>
            </View>
            <View style={{ flex: 1 }} />
            {/* <TouchableOpacity onPress={() => { Actions.Review() }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 30, borderRadius: 3, backgroundColor: commonColors.sunglow }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>评价</Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: 15 }} /> */}
        </TouchableOpacity>
    )
}

class PaidOrder extends PureComponent {

    componentDidMount() {
        const { token, getCompleteOrder } = this.props;
        getCompleteOrder(token, 0, 20);
    }

    render() {
        const { completeOrder } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <HeaderBar title={'已完成'} />
                <ScrollView style={{ backgroundColor: "white" }}>
                    {
                        completeOrder && completeOrder.map(order => (
                            <OrderInfo key={order.id} item={order} />
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    completeOrder: state.account.completeOrder
});

const mapDispatchToProps = dispatch => ({
    getCompleteOrder: (token, start_id, size) => dispatch(AccountAction.getCompleteOrder(token, start_id, size))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaidOrder);

const styles = StyleSheet.create({
    flex: {
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

    }
})