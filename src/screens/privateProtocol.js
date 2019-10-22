import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { fetchData } from '../store/auth/actions'
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header'


class Main extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            showOrderList: false,
            showModal: false
        }
    }
    componentWillReceiveProps(props) {

    }

    render() {
        var props = this.props
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar
                    title={'隐私协议'}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        authData: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    }
}


export default Main = connect(mapStateToProps, mapDispatchToProps)(Main);

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
    foodItem: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: 'white' },
    bannerContainer: {
        width: screenWidth,
        height: screenHeight / 3,
        backgroundColor: 'white'
    },
    cartButton: {
        backgroundColor: commonColors.malachite,
        width: 120,
        height: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: commonStyles.buttonTextFont,
        color: 'white'
    },
    foodTitle: {
        fontSize: 18, color: "#222222", fontWeight: 'bold'
    },
    plusContainer: {
        width: 30,
        height: 30,

    },
    orderItem: { width: '100%', height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 5, paddingVertical: 10 },
    foodSubTitle: { fontSize: 14, color: 'grey' },
    reviewHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    infoBar: { backgroundColor: commonColors.khaki, width: '100%', alignItems: 'center', justifyContent: 'center', height: 30 },
    specItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 22
    },
    itemImageContainer: {
        width: 100,
        height: 80,
        marginLeft: 15
    },
    starContainer: {
        width: 15,
        height: 15,
        marginHorizontal: 2
    },
    plusContainer: {
        width: 30,
        height: 30,
        right: 10,
        bottom: 5
    },
    stick2Container: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    stick1Container: {
        height: 14,
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 3
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chargeBack: {
        width: screenWidth / 2 - 30,
        height: 80,
        backgroundColor: commonColors.chargeBack,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wideButton: {
        height: 40,
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: '86%',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonColors.limeGreen,
        marginLeft: '7%',
        borderRadius: 8,

    },
    paymentMode: { flexDirection: 'row', alignItems: 'center', marginLeft: 30 }
})