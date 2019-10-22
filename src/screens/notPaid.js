import React from 'react';
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
    const { created_at, final_amount, name, items } = item;
    let pickingTime = undefined;
    if (created_at && created_at.length === 19) {
        pickingTime = `${created_at.slice(0, 4)}年 ${created_at.slice(5, 7)}月 ${created_at.slice(8, 10)}日 ${created_at.slice(11, 13)}:${created_at.slice(14, 16)}`;
    }

    return (
        <TouchableOpacity onPress={() => { Actions.OrderDetail({ orderDetail: item, noQR: true }) }} style={styles.foodItem}>
            {/* <TouchableOpacity style={styles.foodItem}> */}
            <Image source={{ uri: items[0].food.images[0].thumb_url }} style={styles.itemImageContainer} />
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
            <TouchableOpacity onPress={() => { Actions.InstantOrder({ existingOrder: item }) }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 30, borderRadius: 3, backgroundColor: commonColors.limeGreen }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>支付</Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
        </TouchableOpacity>
    )
}

class NotPaid extends React.PureComponent {

    componentDidMount() {
        const { token, getPendingOrder } = this.props;
        getPendingOrder(token, 0, 20);
    }


    renderBuy() {
        return (
            <ScrollView style={{ backgroundColor: "white" }}>
                <FoodItem orderStatus={'done'} name={'牛肉'} price={20.08} key={'1'} />
                <FoodItem name={'牛肉'} price={20.08} key={'2'} />
            </ScrollView>
        )
    }

    render() {
        const { pendingOrder } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <HeaderBar title={'未支付'} />
                <ScrollView style={{ backgroundColor: "white" }}>
                    {
                        pendingOrder && pendingOrder.map(order => (
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
    pendingOrder: state.account.pendingOrder
});

const mapDispatchToProps = dispatch => ({
    getPendingOrder: (token, start_id, size) => dispatch(AccountAction.getPendingOrder(token, start_id, size))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotPaid);

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