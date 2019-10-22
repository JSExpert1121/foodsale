import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { connect } from "react-redux";
import { wancan } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import HeaderBar from './header'
import * as commonColors from "../styles/colors";

const FoodItem = ({ orderStatus, price, name }) => {
    return (
        <TouchableOpacity onPress={() => { Actions.OrderDetail() }} style={styles.foodItem}>
            <Image source={wancan} style={styles.itemImageContainer} />
            <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 16, color: commonColors.accentColor }}> {name}</Text>
                <View style={{ height: 3 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>下单时间 2019-02-14 8:30</Text>
                </View>
                <View style={{ height: 3 }} />
                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>总价 ¥ {price}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => { Actions.Review() }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 30, borderRadius: 3, backgroundColor: commonColors.limeGreen }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>未取餐</Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
        </TouchableOpacity>
    )
}

class ReservedOrder extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderBar title={'预订单'} />
                <ScrollView style={{ backgroundColor: "white" }}>
                    <FoodItem orderStatus={'done'} name={'牛肉'} price={20.08} key={'1'} />
                    <FoodItem name={'牛肉'} price={20.08} key={'2'} />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
});


export default ReservedOrder = connect(mapStateToProps, mapDispatchToProps)(ReservedOrder);

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

    },
})