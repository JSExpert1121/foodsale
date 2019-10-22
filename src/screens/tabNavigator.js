import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import {
    forkFill, magnifierFill, homeFill, customerFill,
    homeOutline, forkOutline, magnifierOutline, customerOutline
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as commonColors from "../styles/colors";
import { Actions } from 'react-native-router-flux';

class MyTabNavigator extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 1
        }
    }

    componentDidMount() {
        this.setState({ selectedMode: this.props.mode });
    }

    renderSection() {
        let { selectedMode } = this.state
        return (
            <View style={{ borderTopColor: '#5fe5bc', borderTopWidth: 1, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, width: '100%', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 0 }); Actions.Main() }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 0 ? homeFill : homeOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 1 }); Actions.Order() }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 1 ? forkFill : forkOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 2 }); Actions.Find() }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 2 ? magnifierFill : magnifierOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 3 }); Actions.Mine() }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 3 ? customerFill : customerOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
            </View>
        )

    }

    render() {
        return (
            <View style={styles.root}>
                {this.renderSection()}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

})

export default MyTabNavigator = connect(mapStateToProps, mapDispatchToProps)(MyTabNavigator);

const styles = StyleSheet.create({
    root: {
        flex: 0,
        width: '100%'
    },
    buttonStyle: {
        width: 25,
        height: 25,
        resizeMode: "contain"
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})