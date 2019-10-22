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

const OrderItem = ({ item }) => {
    const { food_name, total_amount, menu_item_id, food_id, food } = item;
    return (
        <TouchableOpacity onPress={() => Actions.FoodDetail({ id: menu_item_id, foodId: food_id, review: true })} style={styles.foodItem}>
            <Image source={{ uri: food.images[0].thumb_url }} style={styles.itemImageContainer} />
            <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 16, color: commonColors.accentColor }}> {food_name}</Text>
                <View style={{ height: 3 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>下单时间 2019-02-14 8:30</Text>
                </View>
                <View style={{ height: 3 }} />
                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>总价 ¥ {total_amount}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => { Actions.Review({ order: item }) }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 30, borderRadius: 3, backgroundColor: commonColors.sunglow }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>评价</Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
        </TouchableOpacity>
    )
}

class WaitingReview extends PureComponent {

    componentDidMount() {
        const { getWaitingComment, token } = this.props;
        getWaitingComment(token, 0, 20);
    }

    render() {
        const { waitingComment } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'待评价'} />
                <ScrollView style={{ backgroundColor: "white" }}>
                    {waitingComment && waitingComment.map(order => (
                        <OrderItem key={order.id} item={order} />
                    ))}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    waitingComment: state.account.waitingComment
});

const mapDispatchToProps = dispatch => ({
    getWaitingComment: (token, start_id, size) => dispatch(AccountAction.getWaitingComment(token, start_id, size))
});


export default WaitingReview = connect(mapStateToProps, mapDispatchToProps)(WaitingReview);

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
    }
})