import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
	Platform
} from 'react-native';
import { connect } from "react-redux";
import { magnifyIcon, mapArrowIcon, pin } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import HeaderBar from './header'
// import { Platform } from '@unimodules/core';
import Constants from 'expo-constants';
import CustomInput from '../components/TextField/CustomInput';
import { getDistanceFromLatLonInKm } from '../helpers/geolocation';
import WideButton from '../components/Button/WideButton';
import Alert from '../components/Dialog/Alert';
import Confirm from '../components/Dialog/ConfirmDialog';
import { MapView, Marker } from 'react-native-amap3d';
import * as UserAction from '../store/user/actions';
import * as FoodAction from '../store/food/actions';
import UserApi from '../service/user';

const PlaceItem = ({ title, address, distance, handleClick }) => {
	return (
		<TouchableOpacity onPress={handleClick}>
			<View style={{ width: '100%', height: 40, flexDirection: 'row', marginVertical: 7, alignItems: 'center' }}>
				<View>
					<Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>
					<Text style={{ fontSize: 12, color: commonColors.contentColor }}>{address}</Text>
				</View>
				<View style={{ flex: 1 }} />
				<Text style={{ fontSize: 14, color: commonColors.contentColor, marginRight: 10 }}>{distance.toFixed(2) + ' km'}</Text>
				<Image source={mapArrowIcon} style={{ width: 30, height: 30 }} />
			</View>
		</TouchableOpacity>
	)
}

class MapViewer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: '',
			networks: [...props.networks],
			openAlert: false,
			openConfirm: false,
			alertTitle: '',
			alertContent: '',
			isBusy: false,
		}

		const len = props.networks && props.networks.length;
		this.markers = [];
		this.curIdx = -1;
		for (let i = 0; i < len; i++) {
			this.markers.push(React.createRef());
		}
	}

	componentDidMount() {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({ error: "Oops, this won't work in an Android emulator. Try it on your device" });
		}
	}

	handleChange = value => {
		const { networks } = this.props;
		const refined = value.replace(/\t/g, "");
		const filtered = networks.filter(net => (net.name.includes(value) || (net.state.name + net.city.name + net.area.name + net.address).includes(value)));
		this.setState({
			networks: filtered,
			search: refined
		});
		console.log(this.refs);
	}

	selectMark = id => {
		const { networks } = this.props;
		const idx = networks.map(net => net.id).indexOf(id);
		this.markers[idx].current.active();
		this.curIdx = id;
	}

	pressMark = id => {
		this.curIdx = parseInt(id);
	}

	handleAdd = () => {
		if (isNaN(this.curIdx) || this.curIdx < 0) {
			this.setState({ openAlert: true, alertTitle: '错误', alertContent: '首先，请你选择网店' });
			return;
		}

		this.setState({ openConfirm: true });
	}

	addNetwork = async () => {
		const { token, getRecentNetworks, currentSuccess, getInterestFoods, getPopularFoods } = this.props;
		this.setState({ openConfirm: false, isBusy: true });
		try {
			await UserApi.addNetwork(token, this.curIdx);
			this.setState({ openAlert: true, alertTitle: '情报', alertContent: '添加网店成功', isBusy: false });
			getRecentNetworks(token);
			const { data } = await UserApi.getCurrentNetwork(token);
			currentSuccess(data);
			getInterestFoods(token, data.id);
			getPopularFoods(token, data.id);
		} catch (error) {
			console.log('MapView.addNetwork: ', error);
			this.setState({ openAlert: true, alertTitle: '错误', alertContent: '添加网店失败', isBusy: false });
		}
	}

	closeAlert = () => {
		this.setState({ openAlert: false });
		if (this.state.alertTitle === '情报') {
			Actions.popTo('Main');
		}
	}

	updateMarker = index => {
		if (this.markers[index] && PlaceItem.OS === 'android') {
			this.markers[index].current.sendCommand("update");
		}
	}

	render() {
		const { city, location } = this.props;
		const { networks, alertTitle, alertContent } = this.state;
		const lat = city ? city.lat : location.lat;
		const lng = city ? city.lng : location.lng;
		// const delta = 10.0 / 111;
		return (
			<View style={{ flex: 1 }}>
				<HeaderBar title={'地图'} />
				<MapView
					coordinate={{
						latitude: parseFloat(lat),
						longitude: parseFloat(lng)
					}}
					style={{ width: '100%', height: '45%' }}
				>
					{
						networks.map((net, index) => (
							<Marker
								key={net.id}
								identifier={net.id.toString()}
								coordinate={{ latitude: parseFloat(net.lat), longitude: parseFloat(net.lng) }}
								title={net.name}
								description={net.state.name + net.city.name + net.area.name + net.address}
								icon={() => <Image source={pin} style={{ width: 20, height: 20 }} onLoad={() => this.updateMarker(index)} />}
								ref={this.markers[index]}
								onPress={(e) => this.pressMark(e.nativeEvent.id)}
							/>
						))
					}
					<Marker
						key={'me'}
						identifier={'me'}
						coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(lng) }}
						image='circle'
						infoWindowDisabled={true}
					/>
				</MapView>
				<View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
					<View style={styles.inputContainer}>
						<TouchableOpacity
							onPress={() => { Actions.pop() }}
							style={{ width: 30, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
							{/* <Ionicons name="md-close" size={20} color={"black"} /> */}
							<Image source={magnifyIcon} style={{ width: 20, height: 20 }} />
						</TouchableOpacity>
						<CustomInput
							placeholder=""
							style={{ ...styles.input, flex: 1 }}
							value={this.state.search}
							onChange={this.handleChange}
						/>
					</View>
					<Text style={{ marginTop: 20, marginBottom: 5, fontSize: 16, color: commonColors.contentColor }}>
						附近一盒香
                  	</Text>
					{
						networks.map(net => (
							<PlaceItem
								key={net.id}
								title={net.name}
								address={net.state.name + net.city.name + net.area.name + net.address}
								distance={getDistanceFromLatLonInKm(lat, lng, parseFloat(net.lat), parseFloat(net.lng))}
								handleClick={() => this.selectMark(net.id)}
							/>
						))
					}
					<View style={{ flex: 1 }}></View>
					<WideButton title='添加网店' handleClick={this.handleAdd} />
				</View>
				<Alert
					open={this.state.openAlert}
					title={alertTitle}
					content={alertContent}
					handleOK={this.closeAlert}
				/>
				<Confirm
					open={this.state.openConfirm}
					title='确认'
					content='你要添加选择的网店吗？'
					handleOK={this.addNetwork}
					handleCancel={() => this.setState({ openConfirm: false })}
				/>
				{this.state.isBusy && <ActivityIndicator size='large' />}
			</View>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	token: state.auth.token,
	current: state.user.current,
	location: state.user.location,
	city: state.user.city,
	cities: state.city.cities,
	networks: state.city.networks,
});

const mapDispatchToProps = dispatch => ({
	addNetwork: (token, id) => dispatch(UserAction.addNetwork(token, id)),
	getRecentNetworks: (token) => dispatch(UserAction.getRecentNetworks(token)),
	getInterestFoods: (token, outlet) => dispatch(FoodAction.getInterestFood(token, outlet)),
	getPopularFoods: (token, outlet) => dispatch(FoodAction.getPopularFood(token, outlet)),
	currentSuccess: (data) => dispatch(UserAction.currentSuccess(data))
});

export default MapViewer = connect(mapStateToProps, mapDispatchToProps)(MapViewer);

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
	inputContainer: {
		marginTop: 10,
		backgroundColor: '#eee',
		flexDirection: 'row',
		borderRadius: 7,
		paddingHorizontal: 15,
	},
	mainPart: {
		paddingHorizontal: 20
	},
	input: {
		color: commonColors.title,
		borderRadius: 3,
		fontSize: 18,
		height: 45,
		shadowColor: 'white',
		shadowOffset: { height: 2 },
		shadowOpacity: 0,
		shadowRadius: 0,
	},
	informationLine: { marginVertical: 7, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
	wideButton: { height: 40, paddingHorizontal: 10, flexDirection: 'row', width: '100%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.limeGreen, borderRadius: 10 }
})