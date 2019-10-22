import React, { PureComponent } from 'react'
import {
	View,
	StyleSheet,
	Image,
	Text,
	Dimensions,
	TouchableOpacity,
	Linking
} from 'react-native'
import { connect } from "react-redux";
import { phoneIcon, receiverIcon } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header'

const SERVICE_PHONE1 = '17128239344';
const SERVICE_PHONE2 = '17128239345';

class ServiceSetting extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			selectedMode: 'weixin',
			showOrderList: false,
			showModal: false,
			price: '',
			code: '0000',
			showModalFlag: false
		}
	}

	onCall1 = () => {
		Linking.openURL(`tel:${SERVICE_PHONE1}`);
	}

	onCall2 = () => {
		Linking.openURL(`tel:${SERVICE_PHONE2}`);
	}

	render() {
		return (
			<View style={styles.root}>
				<HeaderBar title={'客服设置'} />
				<View style={{ backgroundColor: 'white' }}>
					<TouchableOpacity style={styles.informationLine} onPress={this.onCall1}>
						<Image source={receiverIcon} style={{ width: 30, height: 30, resizeMode: "contain" }} />
						<View style={{ width: 20 }}></View>
						<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>人工客服</Text>
						<View style={{ flex: 1 }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.informationLine} onPress={this.onCall2}>
						<Image source={phoneIcon} style={{ width: 30, height: 30 }} />
						<View style={{ width: 20 }}></View>
						<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>联系客服</Text>
						<View style={{ flex: 1 }} />
					</TouchableOpacity>
				</View>
				<View style={{ height: 40 }}></View>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
});


export default ServiceSetting = connect(mapStateToProps, mapDispatchToProps)(ServiceSetting);

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'white',
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
	}
})