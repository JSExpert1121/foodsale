import React, { PureComponent, createRef } from 'react'
import {
	View,
	StyleSheet,
	Image,
	Text,
	Dimensions,
	TouchableOpacity,
} from 'react-native'
import { connect } from "react-redux";
import {
	yuanIcon, check_3x
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import HeaderBar from './header'

const ChargeDetail = (props) => {

	const { mode, amount, user } = props;
	const balance = user.balances;
	let strBalance = '';
	if (typeof balance === 'number') strBalance = balance.toFixed(2);
	else strBalance = balance;

	return (
		<View style={styles.root}>
			<HeaderBar title={'支付完成'} />
			<View style={{ width: '100%', height: 150, alignItems: 'center', justifyContent: 'center' }}>
				<Image source={check_3x} style={{}}></Image>
				<View style={{ height: 14 }} />
				<Text style={{ fontSize: 18, color: commonColors.accentColor }}>
					{(mode === 'alipay') ? '支付宝支付成功' : '微信支付成功'}
				</Text>
			</View>
			<View style={{ backgroundColor: 'white' }}>
				<View style={styles.informationLine}>
					<Text style={{ color: commonColors.contentColor, fontSize: 14 }}>充值金额</Text>
					<View style={{ flex: 1 }} />
					<Text style={{ color: commonColors.accentColor, fontSize: 14 }}>¥ {amount}</Text>
				</View>
			</View>
			<View style={{ width: '100%', height: 150, alignItems: 'center', justifyContent: 'center' }}>
				<Image source={yuanIcon} style={{ width: 50, height: 50 }}></Image>
				<View style={{ height: 14 }} />
				<Text style={{ fontSize: 18, color: commonColors.accentColor }}>我的钱包</Text>
				<View style={{ height: 14 }} />
				<Text style={{ fontSize: 18, color: commonColors.accentColor }}>
					{'¥ '}
					<Text style={{ fontSize: 28 }}>{strBalance}</Text>
				</Text>
			</View>

			<View style={{ height: 40 }} />
			<View style={styles.mainPart}>
				<TouchableOpacity onPress={() => Actions.Reset('Remain')} style={styles.wideButton}>
					<Text style={{ color: 'white', fontSize: 18 }}>完成</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1 }} />

		</View>
	)
}

const mapStateToProps = state => ({
	user: state.auth.user,
})

export default connect(mapStateToProps)(ChargeDetail);

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
	informationLine: { marginVertical: 7, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
	wideButton: { height: 40, paddingHorizontal: 10, flexDirection: 'row', width: '100%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.limeGreen, borderRadius: 10 }
})