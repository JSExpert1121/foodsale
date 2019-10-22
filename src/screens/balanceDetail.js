import React, { PureComponent } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import * as AccountAction from '../store/accounts/actions';
import { ScrollView } from 'react-native-gesture-handler';
import WideButton from '../components/Button/WideButton';

const HistoryItem = ({ item }) => {
	const { amount, note, created_at } = item;
	// const price = amount < 0 ? amount.toFixed(2) : `+${amount.toFixed(2)}`;
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
			<View>
				<Text style={{ color: commonColors.accentColor, fontSize: 18 }}>{note}</Text>
				<Text style={{ color: commonColors.contentColor, fontSize: 12 }}>{created_at}</Text>
			</View>
			<View style={{ flex: 1 }} />
			<View>
				<Text style={{ color: commonColors.limeGreen, fontSize: 18 }}>{amount}</Text>
			</View>
		</View>
	)
}

class BalanceDetail extends PureComponent {
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
		this.pinInput = React.createRef();
	}

	componentDidMount() {
		const { token, getHistory } = this.props;
		getHistory(token, 0, 20);
	}

	loadMore = () => {
		const { balances, token, getHistory } = this.props;
		if (balances && balances.length > 0 && balances.length % 20 === 0) {
			getHistory(token, balances[balances.length - 1].id, 20);
		}
	}

	render() {
		const { balances } = this.props;
		return (
			<View style={styles.root}>
				<View style={styles.headerContainer}>
					<TouchableOpacity
						onPress={() => { Actions.pop() }} style={styles.leftIcon}>
						<Ionicons name="md-close" size={30} color={"black"} />
					</TouchableOpacity>
					<TouchableOpacity style={{ flex: 1, alignItems: 'center' }}><Text style={{ fontSize: 18 }}>余额明细</Text></TouchableOpacity>
				</View>
				<ScrollView style={{ flex: 1 }}>
					{balances && balances.map(item => (
						<HistoryItem key={item.id} item={item} />
					))}
				</ScrollView>
				<View>
					<WideButton title='Load More' handleClick={this.loadMore} />
				</View>

				{/* <HistoryItem></HistoryItem>
				<HistoryItem></HistoryItem> */}
			</View>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	token: state.auth.token,
	balances: state.account.balanceHistory,
});

const mapDispatchToProps = dispatch => ({
	getHistory: (token, start_id, size, status) => dispatch(AccountAction.getBalanceHistory(token, start_id, size, status))
});

export default BalanceDetail = connect(mapStateToProps, mapDispatchToProps)(BalanceDetail);

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
	wideButton: { height: 40, paddingHorizontal: 10, flexDirection: 'row', width: '100%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.limeGreen, borderRadius: 10 },
	headerContainer: {
		marginTop: Constants.statusBarHeight,
		height: 60,
		width: '100%',
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: 'center',
		flexDirection: "row",
		backgroundColor: 'white',
		elevation: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc'
	},
})