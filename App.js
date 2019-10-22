import React, { PureComponent } from "react";
import Router from "./src/router";
import JPush from 'jpush-react-native';
import { Provider } from 'react-redux';
import XPay from 'react-native-puti-pay';

import configureStore from './src/store'
const store = configureStore();

JPush.init();

export default class TripShop extends PureComponent {

	componentDidMount() {
		XPay.setAlipaySandbox(true);
		XPay.setAlipayScheme('ap2016101000653729');
		JPush.addConnectEventListener(this.connectListener);
		JPush.addNotificationListener(this.notificationListener);
	}

	connectListener = result => {
		console.log("connectListener:" + JSON.stringify(result))
	};

	notificationListener = result => {
		console.log("notificationListener:" + JSON.stringify(result))
	};

	render() {
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}
