import React, { PureComponent } from 'react'
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	TouchableOpacity,
	Modal,
	Switch
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import HeaderBar from './header'
import Ionicons from '@expo/vector-icons/Ionicons';
import WideButton from '../components/Button/WideButton';
import * as AuthAction from '../store/auth/actions';
import AsyncStorage from '@react-native-community/async-storage';


class Setting extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			notify: true
		}
	}

	signOut = async () => {
		const { token, logout } = this.props;
		try {
			await AsyncStorage.setItem('access_token', '')
			logout(token);
			Actions.reset('Login');
		} catch (e) {
			console.log('Setting.SignOut: ', e);
		}
	}

	renderModal() {
		return (
			<Modal transparent={true} visible={this.state.showModal}>
				<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<View style={{ width: '70%', height: 220, marginTop: 150, backgroundColor: 'white', borderRadius: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderBottomColor: 'green', borderBottomWidth: 1 }}>
							<View style={{ flex: 1 }} />
							<Text style={{ textAlign: 'center', fontSize: 18 }}>版本更新</Text>
							<View style={{ flex: 1 }} />
						</View>
						<View style={{ paddingLeft: 15, paddingTop: 15 }}>
							<Text style={{ color: commonColors.contentColor, fontSize: 18 }}>1.新增***功能</Text>
							<Text style={{ color: commonColors.contentColor, fontSize: 18 }}>2.新增***功能</Text>
							<Text style={{ color: commonColors.contentColor, fontSize: 18 }}>3.新增***功能</Text>
						</View>
						<View style={{ flex: 1 }}></View>
						<View style={{ height: 50, width: '100%', flexDirection: 'row', borderTopColor: '#eee', borderTopWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Text onPress={() => { this.setState({ showModal: false }) }} style={{ flex: 1, textAlign: 'center', color: commonColors.contentColor }}>取消</Text>
							<View style={{ width: 1, backgroundColor: '#eee', height: '100%' }}></View>
							<Text onPress={() => { this.setState({ showModal: false }) }} style={{ flex: 1, textAlign: 'center', color: commonColors.contentColor }}>确认更新</Text>
						</View>
					</View>
				</View>
			</Modal>
		)
	}

	render() {
		return (
			<View style={styles.root}>
				<HeaderBar title={'设置'} />
				<View>
					<TouchableOpacity style={styles.informationLine} onPress={() => { Actions.ChangePassword() }}>
						<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>设置密码</Text>
						<View style={{ flex: 1 }} />
						<Ionicons name={'ios-arrow-forward'} size={24} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.informationLine}>
						<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>确认提示</Text>
						<View style={{ flex: 1 }} />
						<Switch onValueChange={val => this.setState({ notify: val })} value={this.state.notify} style={styles.switch} />
						{/* <Ionicons name={'ios-arrow-forward'} size={24} /> */}
					</TouchableOpacity>
					<TouchableOpacity style={styles.informationLine} onPress={() => { this.setState({ showModal: true }) }}>
						<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>当前版本</Text>
						<View style={{ flex: 1 }} />
						<Ionicons name={'ios-arrow-forward'} size={24} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.informationLine} onPress={() => { Actions.UserProtocol() }}>
						<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>用户协议</Text>
						<View style={{ flex: 1 }} />
						<Ionicons name={'ios-arrow-forward'} size={24} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.informationLine} onPress={() => { Actions.PrivateProtocol() }}>
						<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>隐私协议</Text>
						<View style={{ flex: 1 }} />
						<Ionicons name={'ios-arrow-forward'} size={24} />
					</TouchableOpacity>
				</View>
				<View style={{ height: 40 }}></View>
				<WideButton title={'退出登录'} handleClick={this.signOut} />
				{this.renderModal()}
			</View>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
	logout: (token) => dispatch(AuthAction.logout(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		resizeMode: 'cover',
		alignItems: 'center',
	},
	mainPart: {
		paddingHorizontal: 20
	},
	informationLine: {
		marginVertical: 7,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: 'white'
	},
	switch: {
		height: 30,
		width: 80
	},
	wideButton: {
		height: 40,
		paddingHorizontal: 10,
		flexDirection: 'row',
		width: '90%',
		marginLeft: '5%',
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: commonColors.limeGreen,
		borderRadius: 10
	}
})