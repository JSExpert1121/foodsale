import React, { PureComponent } from "react";

import { KeyboardAvoidingView, View, Dimensions } from "react-native";
import { Scene, Router, Actions, Overlay } from 'react-native-router-flux';
import { Asset } from 'expo-asset';

import Main from '@screens/main';
// import Dashboard from '@screens/dashboard';
import Login from '@screens/auth/login';
import Mine from '@screens/mine';
import QuickRegister from '@screens/auth/quickRegister';
import WeixinRegister from '@screens/auth/weixinRegister';
import ForgetPassword from '@screens/auth/forgetPassword';
import ConfirmPassword from '@screens/auth/confirmPassword';
import ChangePassword from '@screens/auth/changePassword';
import Breakfast from '@screens/breakfast';
import FoodDetail from '@screens/foodDetail';
import ShoppingCart from '@screens/shoppingCart';
import Charge from '@screens/charge';
import InstantCharge from '@screens/instantCharge';
import InstantOrder from '@screens/instantOrder';
import IssuePayment from '@screens/issuePayment';
import ChargeDetail from '@screens/chargeDetail';
import MapViewer from '@screens/mapView';
import ChargeInfo from '@screens/chargeInfo';
import WalletDetail from '@screens/walletDetail';
import Find from '@screens/find';
import SelectOrder from '@screens/selectOrder';
import SelectCity from '@screens/selectCity';
import NearCity from '@screens/nearCity';
import Order from '@screens/order';
import OrderDetail from '@screens/orderDetail';
import PersonInfo from '@screens/personInfo';
import WaitingReview from '@screens/waitingReview';
import BalanceDetail from '@screens/balanceDetail';
import Remain from '@screens/remain';
import Review from '@screens/review';
import Score from '@screens/score';
import WaitingBring from '@screens/waitingBring';
import AboutUs from '@screens/aboutUs';
import Setting from '@screens/setting';
import UserProtocol from '@screens/userProtocol';
import PrivateProtocol from '@screens/privateProtocol';
import ServiceSetting from '@screens/serviceSetting';
import Coupon from '@screens/coupon';
import CouponAvailable from '@screens/couponAvailable';
import InformationCenter from '@screens/informationCenter';
import Paid from '@screens/paid';
import NotPaid from '@screens/notPaid';
import ReservedOrders from '@screens/reservedOrders';
import PayDetail from '@screens/payDetail';
import Service from '@screens/service';
import Special from '@screens/special';

export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            setting: {},
            offlineMode: false,
        };

        this._cacheResourcesAsync.bind(this)
        console.disableYellowBox = true;
        this.scenes = Actions.create(
            <Overlay key="overlay">
                <View key="xx" hideNavBar>
                    <Scene key="Login" component={Login} title="Login" hideTabBar />
                    <Scene key="ChangePassword" component={ChangePassword} title="ChangePassword" hideTabBar />
                    <Scene key="MapViewer" component={MapViewer} title="MapViewer" hideTabBar />
                    <Scene key="Coupon" component={Coupon} title="Coupon" hideTabBar />
                    <Scene key="CouponAvailable" component={CouponAvailable} title="CouponAvailable" hideTabBar />
                    <Scene key="ReservedOrders" component={ReservedOrders} title="ReservedOrders" hideTabBar />
                    <Scene key="Paid" component={Paid} title="Paid" hideTabBar />
                    <Scene key="NotPaid" component={NotPaid} title="NotPaid" hideTabBar />
                    <Scene key="ServiceSetting" component={ServiceSetting} title="ServiceSetting" hideTabBar />
                    <Scene key="Setting" component={Setting} title="Setting" hideTabBar />
                    <Scene key="AboutUs" component={AboutUs} title="AboutUs" hideTabBar />
                    <Scene key="Score" component={Score} title="Score" hideTabBar />
                    <Scene key="Review" component={Review} title="Review" hideTabBar />
                    <Scene key="Mine" component={Mine} title="Mine" hideTabBar />
                    <Scene key="BalanceDetail" component={BalanceDetail} title="BalanceDetail" hideTabBar />
                    <Scene key="Service" component={Service} title="Service" hideTabBar />
                    <Scene key="Remain" component={Remain} title="Remain" hideTabBar />
                    <Scene key="WaitingReview" component={WaitingReview} title="WaitingReview" hideTabBar />
                    <Scene key="PersonInfo" component={PersonInfo} title="Mine" hideTabBar />
                    <Scene key="Order" component={Order} title="Order" hideTabBar />
                    <Scene key="WaitingBring" component={WaitingBring} title="WaitingBring" hideTabBar />
                    <Scene key="OrderDetail" component={OrderDetail} title="OrderDetail" hideTabBar />
                    <Scene key="SelectOrder" component={SelectOrder} title="SelectOrder" hideTabBar />
                    <Scene key="NearCity" component={NearCity} title="NearCity" hideTabBar />
                    <Scene key="SelectCity" component={SelectCity} title="SelectCity" hideTabBar />
                    <Scene key="Find" component={Find} title="Find" hideTabBar />
                    <Scene key="Special" component={Special} title="Special" hideTabBar />
                    <Scene key="ChargeDetail" component={ChargeDetail} title="ChargeDetail" hideTabBar />
                    <Scene key="PayDetail" component={PayDetail} title="PayDetail" hideTabBar />
                    <Scene key="WalletDetail" component={WalletDetail} title="WalletDetail" hideTabBar />
                    <Scene key="ChargeInfo" component={ChargeInfo} title="ChargeInfo" hideTabBar />
                    <Scene key="IssuePayment" component={IssuePayment} title="IssuePayment" hideTabBar />
                    <Scene key="Charge" component={Charge} title="Charge" hideTabBar />
                    <Scene key="InstantCharge" component={InstantCharge} title="InstantCharge" hideTabBar />
                    <Scene key="InstantOrder" component={InstantOrder} title="InstantCharge" hideTabBar />
                    <Scene key="ShoppingCart" component={ShoppingCart} title="Shopping Cart" hideTabBar />
                    <Scene key="FoodDetail" component={FoodDetail} title="FoodDetail" hideTabBar />
                    {/* <Scene key="Dashboard" component={Dashboard} title="Dashboard" hideTabBar /> */}
                    <Scene key="Main" component={Main} title="Main" hideTabBar />
                    <Scene key="Breakfast" component={Breakfast} title="Breakfast" hideTabBar />
                    <Scene key="QuickRegister" component={QuickRegister} title="QuickRegister" hideTabBar />
                    <Scene key="WeixinRegister" component={WeixinRegister} title="WeixinRegister" hideTabBar />
                    <Scene key="ForgetPassword" component={ForgetPassword} title="ForgetPassword" hideTabBar />
                    <Scene key="ConfirmPassword" component={ConfirmPassword} title="ConfirmPassword" hideTabBar />
                    <Scene key="UserProtocol" component={UserProtocol} title="UserProtocol" hideTabBar />
                    <Scene key="PrivateProtocol" component={PrivateProtocol} title="PrivateProtocol" hideTabBar />
                    <Scene key="InformationCenter" component={InformationCenter} title="InformationCenter" hideTabBar />
                </View>
            </Overlay>
        );
    }

    _cacheResourcesAsync = async () => {
        const images = [
            require('@images/homeOutline.png'),
            require('@images/homeFill.png')
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        return Promise.all(cacheImages)
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Router hideNavBar scenes={this.scenes} onStateChange={() => { }} />
            </KeyboardAvoidingView>
        )
    }
}

export default Root;