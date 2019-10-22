import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import HeaderBar from './header'
import { Actions } from 'react-native-router-flux';
import * as CityAction from '../store/city/actions';
import * as UserAction from '../store/user/actions';
import * as FoodAction from '../store/food/actions';
import UserApi from '../service/user';

import WideButton from '../components/Button/WideButton';
import Alert from '../components/Dialog/Alert';


class NearCity extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            openAlert: false,
            alertTitle: '',
            alertContent: '',
            isBusy: false
        }
    }

    async componentDidMount() {
        const { token, location } = this.props;
        let pos = {};
        if (!location) {
            const location = await this.getLocation();
            location.latitude = 34.757975, location.longitude = 113.665412;
            this.props.setPosition(location.latitude, location.longitude);
            pos.lat = location.latitude;
            pos.lng = location.longitude;
        } else {
            pos = location;
        }

        this.props.getNearbyNetworks(token, pos.lat, pos.lng);
        this.props.getActiveCities(token);
        this.props.getRecentNetworks(token);
    }

    getLocation = async () => {
        try {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({ error: "Permission to access location was denied" });
            }

            const { coords } = await Location.getCurrentPositionAsync({});
            console.log('NearCity.getLocation: ', coords);
            return coords;
        } catch (error) {
            console.log('NearCity.getLocation: ', error);
        }
    }

    selectCity = city => {
        if (this.state.isBusy) return;
        console.log('NearCity.selectCity: ', city);
        const { token, location } = this.props;
        this.props.getNearbyNetworks(token, location.lat, location.lng, city);
    }

    selectNet = async net => {
        if (this.state.isBusy) return;
        const { token, getRecentNetworks, currentSuccess, getInterestFoods, getPopularFoods } = this.props;
        this.setState({ isBusy: true });
        try {
            await UserApi.addNetwork(token, net.id);
            this.setState({ openAlert: true, alertTitle: '情报', alertContent: '添加网店成功', isBusy: false });
            getRecentNetworks(token);
            const { data } = await UserApi.getCurrentNetwork(token);
            currentSuccess(data);
            getInterestFoods(token, data.id);
            getPopularFoods(token, data.id);
        } catch (error) {
            console.log('NearCity.addNetwork: ', error);
            this.setState({ openAlert: true, alertTitle: '错误', alertContent: '添加网店失败', isBusy: false });
        }
    }

    closeAlert = () => {
        this.setState({ openAlert: false });
        if (this.state.alertTitle === '情报') {
            Actions.popTo('Main');
        }
    }

    gotoMap = () => {
        Actions.MapViewer();
    }

    render() {
        const { cities, networks, recent } = this.props;
        const { openAlert, alertTitle, alertContent } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar title={'附近'} />
                <View style={{ paddingHorizontal: 10, marginTop: 25 }}>
                    <Text style={{ marginLeft: 15, marginBottom: 15 }}>{'附近网店'}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            networks && networks.map(net => (
                                <TouchableOpacity onPress={() => this.selectNet(net)} key={net.id}>
                                    <View style={styles.cityComponent}>
                                        <Text>{net.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 25 }}>
                    <Text style={{ marginLeft: 15, marginBottom: 15 }}>{'即将开通城市'}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            cities && cities.map(city => (
                                <TouchableOpacity onPress={() => this.selectCity(city)} key={city.code}>
                                    <View style={styles.cityComponent}>
                                        <Text>{city.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 25 }}>
                    <Text style={{ marginLeft: 15, marginBottom: 15 }}>{'常用的网店'}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            recent && recent.map(net => (
                                <TouchableOpacity onPress={() => this.selectNet(net)} key={net.id}>
                                    <View style={styles.cityComponent}>
                                        <Text>{net.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
                <WideButton title='看在地图' handleClick={this.gotoMap} />
                <Alert
                    open={openAlert}
                    title={alertTitle}
                    content={alertContent}
                    handleOK={this.closeAlert}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    current: state.user.current,
    location: state.user.location,
    recent: state.user.recent,
    cities: state.city.cities,
    networks: state.city.networks,
});

const mapDispatchToProps = dispatch => ({
    // currentSuccess: (data) => dispatch(UserAction.currentSuccess(data))
    setPosition: (lat, lon) => dispatch(UserAction.setPosition(lat, lon)),
    getNearbyNetworks: (token, lat, lng, city) => dispatch(CityAction.getNearbyNetwork(token, lat, lng, 10, city)),
    getActiveCities: (token) => dispatch(CityAction.getActiveCities(token)),
    getCurrentNetwork: token => dispatch(UserAction.getCurrentNetwork(token)),
    getRecentNetworks: (token) => dispatch(UserAction.getRecentNetworks(token)),
    getInterestFoods: (token, outlet) => dispatch(FoodAction.getInterestFood(token, outlet)),
    getPopularFoods: (token, outlet) => dispatch(FoodAction.getPopularFood(token, outlet)),
    currentSuccess: (data) => dispatch(UserAction.currentSuccess(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(NearCity);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
    },

    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cityComponent: { alignItems: 'center', justifyContent: 'center', height: 40, width: screenWidth / 3 - 20, borderWidth: 1, borderRadius: 7, marginHorizontal: 5, marginVertical: 5 },
    paymentMode: { flexDirection: 'row', alignItems: 'center', marginLeft: 30 }
})