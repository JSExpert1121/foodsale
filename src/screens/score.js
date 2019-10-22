import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { connect } from "react-redux";
import { scoreBackground } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as commonColors from "../styles/colors";
import HeaderBar from './header';
import * as AccountAction from '../store/accounts/actions';

const ResponsiveImageBackground = ({ targetWidth, originWidth, originHeight, uri }) => {
    var targetHeight = targetWidth * originHeight / originWidth
    return (
        <ImageBackground source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }} />
                <View style={{}}>
                    <View style={{ height: 15 }} />
                    <Text style={{ color: "white", fontWeight: 'bold' }}>优惠多多             好礼送不停</Text>
                    <Text style={{ color: "white", fontSize: 32, fontWeight: "bold", letterSpacing: 4 }}>评价赚积分</Text>
                </View>
                <View style={{ width: 30 }} />
            </View>
        </ImageBackground>
    )
}

const HistoryItem = ({ item }) => {
    const { point, note, created_at } = item;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            <View>
                <Text style={{ color: commonColors.accentColor, fontSize: 18 }}>{note}</Text>
                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>{created_at}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View>
                <Text style={{ color: commonColors.limeGreen, fontSize: 18 }}>{point}</Text>
            </View>
        </View>
    )
}


class Score extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            showOrderList: false,
            showModal: false
        }
    }

    componentDidMount() {
        const { token, getHistory } = this.props;
        getHistory(token, 0, 20);
    }

    loadMore = () => {
        const { history, getHistory, token } = this.props;
        if (!history || history.length === 0) return;

        getHistory(token, history[history.length - 1].id, 20);
    }

    render() {
        const { user, history } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'积分'} />
                <View style={{ alignItems: "center", justifyContent: 'center' }}>
                    {/* <ResponsiveImageBackground uri={scoreBackground} targetWidth={screenWidth} originWidth={720} originHeight={213} /> */}
                    <View style={{ height: 15 }} />
                    {/* <Text style={{ fontSize: 18 }}>累计积分<Text style={{ fontSize: 24 }}>10</Text>分</Text> */}
                    <Text style={{ fontSize: 24, color: 'red', letterSpacing: 3, margin: 10 }}>¥ {user.points}</Text>
                    <View style={{ height: 15 }} />
                    <ScrollView style={{ flex: 5 }}>
                        {history && history.map((item, idx) => (
                            <HistoryItem key={idx} item={item} />
                        ))}
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={this.loadMore}>
                        <Text style={{ color: 'white' }}>{'获得更多积分'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    history: state.account.pointHistory
});

const mapDispatchToProps = dispatch => ({
    getHistory: (token, start_id, size) => dispatch(AccountAction.getPointHistory(token, start_id, size))
});

export default connect(mapStateToProps, mapDispatchToProps)(Score);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: commonColors.limeGreen,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    container: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
    }
})