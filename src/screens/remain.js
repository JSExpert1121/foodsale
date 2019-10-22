import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import HeaderBar from './header';
import WideButton from '../components/Button/WideButton';

class Remain extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            showOrderList: false,
            showModal: false
        }
    }

    render() {
        const { user } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'余额'} />
                <View style={{ backgroundColor: commonColors.limeGreen, width: '86%', marginLeft: '7%', borderRadius: 15, height: 200, marginTop: 15 }}>
                    <TouchableOpacity onPress={() => { Actions.BalanceDetail() }}>
                        <Text style={{ color: 'white', fontSize: 16, padding: 10, textAlign: 'right' }}>余额明细</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 24, padding: 10, textAlign: 'center' }}>总余额</Text>
                    <Text style={{ color: 'white', fontSize: 30, padding: 10, textAlign: 'center' }}>¥ {user.balances}</Text>
                    {/* <View style={{ flex: 1 }}></View>
                    <Text style={{ color: 'white', fontSize: 16, padding: 10, textAlign: 'left' }}>充值余额 0</Text> */}
                </View>
                <View style={{ flex: 1 }}></View>
                <WideButton title='充值' handleClick={() => { Actions.IssuePayment() }} />
                <View style={{ height: 15 }}></View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
});

export default Remain = connect(mapStateToProps, mapDispatchToProps)(Remain);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    chargeBack: {
        width: screenWidth / 2 - 30,
        height: 80,
        backgroundColor: commonColors.chargeBack,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    }
});