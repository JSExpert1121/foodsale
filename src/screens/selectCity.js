import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native'
import { connect } from "react-redux";
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { fetchData } from '../store/auth/actions'
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header'

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
    var targetHeight = targetWidth * originHeight / originWidth
    return (
        <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
    )
}


class SelectCity extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 'weixin',
            showOrderList: false,
            showModal: false,
            showModalFlag: true
        }
    }
    componentWillReceiveProps(props) {

    }
    renderModal() {
        const { code } = this.state;
        return (
            <Modal
                transparent={true}
                visible={this.state.showModalFlag}
            >
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '70%', height: 180, marginTop: 150, backgroundColor: 'white', borderRadius: 10 }}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>打开【定位服务】来允许-盒香确定您的位置</Text>
                            <View style={{ height: 24 }}></View>
                            <Text style={{ fontSize: 14, textAlign: 'center' }}>请在系统设置中开局定位服务（设置>隐私>定位服务>开局）</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: "center", alignItems: 'center', borderTopColor: "#ccc", borderTopWidth: 1 }}>
                            <TouchableOpacity style={{ flex: 1, fontSize: 20, alignItems: 'center', justifyContent: 'center', padding: 10 }}><Text style={{ textAlign: 'center', color: 'green' }}>取消</Text></TouchableOpacity>
                            <View style={{ width: 1, backgroundColor: '#ccc', height: '100%' }}></View>
                            <TouchableOpacity style={{ flex: 1, fontSize: 20, alignItems: 'center', justifyContent: 'center', padding: 10 }}><Text style={{ textAlign: 'center', color: 'red' }}>设置</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        var props = this.props
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar
                    title={'选择城市'}
                />
                <View style={{ height: 25 }} />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ marginLeft: 15 }}>{'热门城市'}</Text>
                    <View style={{ height: 15 }} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 25 }} />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ marginLeft: 15 }}>{'即将开通城市'}</Text>
                    <View style={{ height: 15 }} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                        <View style={styles.cityComponent}>
                            <Text>郑州</Text>
                        </View>
                    </View>
                </View>
                {this.renderModal()}
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


export default SelectCity = connect(mapStateToProps, mapDispatchToProps)(SelectCity);

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

    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cityComponent: { alignItems: 'center', justifyContent: 'center', height: 40, width: screenWidth / 3 - 20, borderWidth: 1, borderRadius: 7, marginHorizontal: 5, marginVertical: 5 },
    paymentMode: { flexDirection: 'row', alignItems: 'center', marginLeft: 30 }
})