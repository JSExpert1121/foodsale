import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { fetchData } from '../store/auth/actions'
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
                    title={'用户协议'}
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
    }
})