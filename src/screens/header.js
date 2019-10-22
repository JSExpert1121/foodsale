import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from 'react-native-router-flux'
import Constants from 'expo-constants';

const Header = ({ forbidAutoBack, refresh, backWarn, rightIcon, rightCallback, NoBackButton, title }) => {

	const handleBack = () => {
		if (!forbidAutoBack) { Actions.pop() };
		if (refresh) { refresh() };
		if (backWarn) { backWarn() }
	}

	return (
		<View style={styles.container}>
			{!NoBackButton &&
				<TouchableOpacity
					onPress={handleBack}
					style={styles.leftIcon}>
					<Ionicons name="ios-arrow-back" size={30} color={"black"} />
				</TouchableOpacity>}
			<Text style={styles.text}>{title}</Text>
			{rightIcon &&
				<TouchableOpacity onPress={() => rightCallback()} style={styles.rightIcon}>
					<Ionicons name={rightIcon} size={18} color={"black"} />
				</TouchableOpacity>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: (Platform.OS === 'ios') ? 20 : 0,
		height: 40 + ((Platform.OS === 'ios') ? 20 : 0),
		width: '100%',
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: 'center',
		flexDirection: "row",
		backgroundColor: 'white',
		elevation: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		position: 'relative'
	},
	text: {
		color: "black",
		fontSize: 18,
		flex: 1,
		textAlign: 'center'
		// fontWeight:'bold'
	},
	leftIcon: {
		width: 40,
		paddingTop: 5
	},
	rightIcon: {
		paddingTop: 11
	}
});

export default Header;