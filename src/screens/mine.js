import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { connect } from "react-redux";
import {
    aboutUsIcon, notBringIcon, reserveOrderIcon, waitingReviewIcon, notPaidIcon, completedIcon,
    loginBackground, helpIcon, logo, noUser, settingIcon, forkOutline, magnifierOutline, customerOutline, roundMailIcon
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as commonColors from "../styles/colors";
import { Actions } from 'react-native-router-flux';
import MyNavigator from '../screens/tabNavigator'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as AccountAction from '../store/accounts/actions';

const StatusCatecory = ({ name, uri, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <Image source={uri} style={styles.iconSize} />
        <Text style={styles.iconLabel}>{name}</Text>
    </TouchableOpacity>
)
class Mine extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'login'
        }
    }

    render() {
        const { user } = this.props;
        const account = user.account.slice(0, 3) + '****' + user.account.slice(7);
        const { nick_name, avatar } = user.profile;
        const extension = avatar && avatar.slice(avatar.length - 3).toLowerCase();
        const source = (extension && (extension === 'jpg' || extension === 'png' || extension === 'peg')) ? { uri: avatar } : noUser;
        return (
            <View style={styles.root}>
                {/* <HeaderBar title={'待支付'} /> */}
                <ImageBackground source={loginBackground} style={styles.headerImageStyle}>
                    <View style={{ height: 40 }}></View>
                    <View style={styles.liner1}>
                        <TouchableOpacity onPress={() => { Actions.InformationCenter() }}>
                            <Image source={roundMailIcon} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <Text style={{ color: 'white', fontSize: 24, justifyContent: 'center' }}>我的</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={() => { Actions.Setting() }}>
                            <Image source={settingIcon} style={{ width: 30, height: 30, resizeMode: "contain" }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 25 }}></View>
                    <TouchableOpacity onPress={() => { Actions.PersonInfo() }}>
                        <View style={styles.liner1}>
                            <Image source={source} style={{ width: 80, height: 80, borderRadius: 40, marginRight: 25, resizeMode: 'contain' }}></Image>
                            <View>
                                <Text style={{ color: 'white', fontSize: 16, justifyContent: 'center' }}>{nick_name}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={logo} style={{ width: 15, height: 15, resizeMode: "contain" }}></Image>
                                    <Text style={{ color: 'white', fontSize: 16, justifyContent: 'center', marginTop: 10 }}>{account}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }} />
                            <Ionicons name={'ios-arrow-forward'} size={24} color={'white'} />
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={[styles.rowLiner, { paddingVertical: 15 }]}>
                    <TouchableOpacity style={styles.subMenu} onPress={() => { Actions.Remain() }}>
                        <Text style={{ color: commonColors.limeGreen, fontSize: 16 }}>
                            {user.balances}<Text style={{ color: commonColors.contentColor, fontSize: 16 }}> 元</Text>
                        </Text>
                        <Text style={{ color: commonColors.accentColor, fontSize: 16, paddingTop: 2 }}>
                            余额
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: 1, backgroundColor: '#eee' }} />
                    <TouchableOpacity style={styles.subMenu} onPress={() => { Actions.Coupon() }}>
                        <Text style={{ color: commonColors.limeGreen, fontSize: 16 }}>
                            {user.coupon_count}<Text style={{ color: commonColors.contentColor, fontSize: 16 }}> 张</Text>
                        </Text>
                        <Text style={{ color: commonColors.accentColor, fontSize: 16, paddingTop: 2 }}>
                            优惠券
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: 1, backgroundColor: '#eee' }} />
                    <TouchableOpacity style={styles.subMenu} onPress={() => { Actions.Score() }}>
                        <Text style={{ color: commonColors.limeGreen, fontSize: 16 }}>
                            {user.points}
                            <Text style={{ color: commonColors.contentColor, fontSize: 16 }}> 分</Text>
                        </Text>
                        <Text style={{ color: commonColors.accentColor, fontSize: 16 }}>
                            积分
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 10, backgroundColor: '#eee' }} />
                <Text style={{ left: 20, fontSize: 18, marginVertical: 15 }}>我的订单</Text>
                <View style={styles.rowLiner}>
                    <StatusCatecory name={'取待餐'} uri={notBringIcon} onPress={() => { Actions.Order() }} />
                    {/* <StatusCatecory name={'预订单'} uri={reserveOrderIcon} onPress={() => { Actions.ReservedOrders() }} /> */}
                    <StatusCatecory name={'待评价'} uri={waitingReviewIcon} onPress={() => { Actions.WaitingReview() }} />
                    <StatusCatecory name={'未支付'} uri={notPaidIcon} onPress={() => { Actions.NotPaid() }} />
                    <StatusCatecory name={'已完成'} uri={completedIcon} onPress={() => { Actions.Paid() }} />
                </View>
                <View style={{ height: 10, backgroundColor: '#eee' }} />
                <Text style={{ left: 20, fontSize: 18, marginVertical: 15 }}>其他</Text>
                <View style={styles.rowLiner}>
                    <StatusCatecory name={'帮组中心'} uri={helpIcon} onPress={() => { Actions.ServiceSetting() }} />
                    <StatusCatecory name={'关于我们'} onPress={() => { Actions.AboutUs() }} uri={aboutUsIcon} />
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 1 }} />
                </View>
                <View style={{ flex: 1 }} />
                <MyNavigator mode={3} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    getCoupons: (token, start_id, size, status) => dispatch(AccountAction.getCoupons(token, start_id, size, status))
});


export default Mine = connect(mapStateToProps, mapDispatchToProps)(Mine);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    subMenu: { flex: 1, alignItems: "center", justifyContent: 'center' },
    iconContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowLiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconLabel: {
        marginTop: 10,
        fontSize: 14
    },
    iconSize: {
        width: 30,
        height: 30
    },
    liner1: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    headerImageStyle: {
        width: '100%',
        height: 200
    }
});