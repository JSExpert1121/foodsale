import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
} from 'react-native'
import { connect } from "react-redux";
import {
    machineBackground, cookingRoomBackground, cookingRoomBackground2, cookingRoomBackground3,
    truckIcon, ovenIcon, iceIcon, roastIcon, snowIcon
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import { fetchData } from '../store/auth/actions'
import { Actions } from 'react-native-router-flux';
import HeaderBar from './header'
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
    var targetHeight = targetWidth * originHeight / originWidth
    return (
        <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
    )
}

class AboutUs extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedMode: 0,
            mode: 'buy',
            markedDatesArray: [],
            markedDates: {
                '2019-06-16': { selected: true, selectedColor: 'red' },
                '2019-06-17': { selected: true, selectedColor: 'red' },
            }
        }
    }
    renderMachine() {
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1, alignItems: 'center', justifyContent: 'center' }}></View>
                    <View><Text style={{ textAlign: 'center', color: commonColors.contentColor, fontSize: 20, marginHorizontal: 5 }}>智能售餐机</Text></View>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1 }}></View>
                </View>
                <View style={{ height: 30 }} />
                <Text style={{ fontSize: 24, textAlign: 'center', color: commonColors.accentColor }}>{'家食客'}</Text>
                <View style={{ height: 30 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", paddingHorizontal: 20 }}>
                    <View>
                        <View style={{ height: 20 }} />
                        <Text style={{ color: commonColors.contentColor }}>食物保鲜</Text>
                        <Text style={{ color: commonColors.contentColor }}>新鲜口感</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                    <ResponsiveImage uri={machineBackground} targetWidth={screenWidth - 200} originWidth={422} originHeight={422} />
                    <View>
                        <View style={{ flex: 1 }} />
                        <Text style={{ color: commonColors.contentColor }}>食物保鲜</Text>
                        <Text style={{ color: commonColors.contentColor }}>新鲜口感</Text>
                        <View style={{ height: 100 }} />
                    </View>
                </View>
            </View>
        )
    }
    renderVegetable() {
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1, alignItems: 'center', justifyContent: 'center' }}></View>
                    <View><Text style={{ textAlign: 'center', color: commonColors.contentColor, fontSize: 20, marginHorizontal: 5 }}>智能售餐机</Text></View>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1 }}></View>
                </View>
                <View style={{ height: 30 }} />
                <Text style={{ fontSize: 24, textAlign: 'center', color: commonColors.accentColor }}>{'选材'}</Text>
                <View style={{ height: 30 }} />
                <Text style={styles.label1}>{'甄选天然食材'}</Text>
                <Text style={styles.label1}>{'穿承餐饮文化'}</Text>
                <Text style={styles.label1}>{'优化传统制餐工艺'}</Text>
                <View style={{ height: 30 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                    <ResponsiveImage uri={machineBackground} targetWidth={screenWidth - 150} originWidth={422} originHeight={422} />
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.verticalLine}>采用中央厨房统一制作</Text>
                        <Text style={styles.verticalLine}>采用中央厨房统一制作</Text>
                        <View style={{ width: 50 }} />
                    </View>
                </View>
            </View>
        )
    }
    renderContact() {
        return (
            <View style={{ marginTop: 60 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1, alignItems: 'center', justifyContent: 'center' }}></View>
                    <View><Text style={{ textAlign: 'center', color: commonColors.contentColor, fontSize: 20, marginHorizontal: 5 }}>联系我们</Text></View>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1 }}></View>
                </View>
                <View style={{ height: 30 }} />
                <Text style={styles.label1}>{'河南一盒香科技有限公司'}</Text>
                <Text style={styles.label1}>{'河南省郑州市金水区世玺中心25楼'}</Text>
                <Text style={styles.label1}>{'电话：0371-6165-5527'}</Text>
                <Text style={styles.label1}>{'电子邮箱：yihexiang111@sina.com'}</Text>
                <View style={{ height: 30 }} />
            </View>
        )
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1, alignItems: 'center', justifyContent: 'center' }}></View>
                    <View><Text style={{ textAlign: 'center', color: commonColors.contentColor, fontSize: 20, marginHorizontal: 5 }}>智能售餐机</Text></View>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1 }}></View>
                </View>
                <View style={{ height: 30 }} />
                <Text style={{ fontSize: 24, textAlign: 'center', color: commonColors.accentColor }}>{'选材'}</Text>
                <View style={{ height: 30 }} />
                <Text style={styles.label1}>{'甄选天然食材'}</Text>
                <Text style={styles.label1}>{'穿承餐饮文化'}</Text>
                <Text style={styles.label1}>{'优化传统制餐工艺'}</Text>
                <View style={{ height: 30 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                    <ResponsiveImage uri={machineBackground} targetWidth={screenWidth - 150} originWidth={422} originHeight={422} />
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.verticalLine}>采用中央厨房统一制作</Text>
                        <Text style={styles.verticalLine}>采用中央厨房统一制作</Text>
                        <View style={{ width: 50 }} />
                    </View>
                </View>
            </View>
        )
    }
    renderCookingRoom() {
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 100, alignItems: 'center', justifyContent: 'center', paddingBottom: 50 }}>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1, alignItems: 'center', justifyContent: 'center' }}></View>
                    <View><Text style={{ textAlign: 'center', color: commonColors.contentColor, fontSize: 20, marginHorizontal: 5 }}>中央厨房</Text></View>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1 }}></View>
                </View>
                <ResponsiveImage uri={cookingRoomBackground} targetWidth={screenWidth} originWidth={642} originHeight={320} />
                <View style={{ height: 20 }} />
                <ResponsiveImage uri={cookingRoomBackground2} targetWidth={screenWidth} originWidth={321} originHeight={160} />
                <View style={{ height: 20 }} />
                <ResponsiveImage uri={cookingRoomBackground3} targetWidth={screenWidth} originWidth={321} originHeight={160} />
            </View>
        )
    }
    renderDelivery1() {
        return (
            <View style={styles.centerAlign}>
                <Image source={ovenIcon} style={styles.deliveryIcon} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.verticalLine}>制热</Text>
                    <Text style={styles.verticalLine}>中央厨房把新鲜食材</Text>
                </View>
            </View>
        )
    }
    renderDelivery2() {
        return (
            <View style={styles.centerAlign}>
                <Image source={snowIcon} style={styles.deliveryIcon} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.verticalLine}>在0度一下</Text>
                    <Text style={styles.verticalLine}>一定时间内把温度控制</Text>
                </View>
            </View>
        )
    }
    renderDelivery3() {
        return (
            <View style={styles.centerAlign}>
                <Image source={truckIcon} style={styles.deliveryIcon} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.verticalLine}>在0度一下</Text>
                    <Text style={styles.verticalLine}>一定时间内把温度控制</Text>
                </View>
            </View>
        )
    }
    renderDelivery4() {
        return (
            <View style={styles.centerAlign}>
                <Image source={iceIcon} style={styles.deliveryIcon} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 20 }}></View>
                    <View>
                        <Text style={styles.verticalLine}>将餐品还原约至</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ transform: [{ rotate: '90deg' }, { translateY: 8 }, { translateX: 10 }], fontSize: 16, color: commonColors.contentColor }}>
                                95%
                                </Text>
                            <View style={{ flex: 1, backgroundColor: 'black' }}></View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.verticalLine}>将餐品还原约至</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ transform: [{ rotate: '90deg' }, { translateY: 10 }, { translateX: 14 }], fontSize: 16, color: commonColors.contentColor }}>
                                95℃
                                </Text>
                            <View style={{ flex: 1, backgroundColor: 'black' }}></View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    renderDelivery5() {
        return (
            <View style={styles.centerAlign}>
                <Image source={roastIcon} style={styles.deliveryIcon} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.verticalLine}>制热</Text>
                    <Text style={styles.verticalLine}>中央厨房把新鲜食材</Text>
                </View>
            </View>
        )
    }
    renderDelivery() {
        return (
            <View style={{ marginTop: 50 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 100, alignItems: 'center', justifyContent: 'center', paddingBottom: 50 }}>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1, alignItems: 'center', justifyContent: 'center' }}></View>
                    <View><Text style={{ textAlign: 'center', color: commonColors.contentColor, fontSize: 20, marginHorizontal: 5 }}>冷链配送</Text></View>
                    <View style={{ flex: 1, backgroundColor: commonColors.limeGreen, height: 1 }}></View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {this.renderDelivery1()}
                    {this.renderDelivery2()}
                    {this.renderDelivery3()}
                    {this.renderDelivery4()}
                    {this.renderDelivery5()}
                </View>
            </View>
        )
    }
    render() {
        var props = this.props
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderBar
                    title={'关于我们'}
                />
                <ScrollView>
                    <View style={{ height: 20 }} />
                    <Text style={{ fontSize: 24, textAlign: 'center', color: commonColors.accentColor }}>{'家食客'}</Text>
                    <View style={{ height: 20 }} />
                    <Text style={styles.label1}>{'全新智能快餐模式'}</Text>
                    <View style={{ height: 10 }} />
                    <Text style={styles.label1}>{'传承优化传统制餐工艺'}</Text>
                    <View style={{ height: 10 }} />
                    <Text style={styles.label1}>{'全冷链保证餐品新鲜安全'}</Text>
                    <View style={{ height: 30 }} />
                    {this.renderMachine()}
                    {this.renderVegetable()}
                    {this.renderCookingRoom()}
                    {this.renderDelivery()}
                    {this.renderContact()}
                </ScrollView>
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


export default AboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs);

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
    centerAlign: {
        flex: 1,
        //justifyContent:'center',
        alignItems: 'center',

    },
    deliveryIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',

    },
    bannerContainer: {
        width: screenWidth,
        height: screenHeight / 3
    },
    verticalLine: {
        marginTop: 15,
        width: 20,
        fontSize: 16,
        color: commonColors.contentColor
    },
    categoryItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    balloonContainer: {
        width: 20,
        height: 26,
        marginRight: 10
    },
    cornerLabel: {
        position: 'absolute', top: 7, right: 7, color: "white", fontSize: 10
    },
    label1: { fontSize: 16, textAlign: 'center', color: commonColors.contentColor, marginBottom: 10 },
    categoryPicture: {
        width: 50,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 5
    },
    starContainer: {
        width: 15,
        height: 15,
        marginHorizontal: 2
    },
    menuPicture: {
        width: screenWidth / 3 - 15,
        height: 70,
        marginBottom: 5,
        paddingHorizontal: 10,
        resizeMode: 'contain'
    },
    categoryMenuContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    stick2Container: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%',
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    stick1Container: {
        height: 14,
    },
    noMessage: {
        color: '#777',
        textAlign: 'center',
        marginTop: 30
    }
    ,
    buttonStyle: {
        width: 25,
        height: 25,
        resizeMode: "contain"
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b7eff'
    },
    buttonText: {
        color: 'white'
    },
    itemImageContainer: {
        width: 80,
        height: 70,
        marginLeft: 15
    },
    plusContainer: {
        width: 30,
        height: 30,
        right: 10,
        bottom: 5
    },
    foodItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        paddingVertical: 10,
        backgroundColor: 'white'

    },
    searchOption:
        { fontSize: 18, textAlign: 'center' }
})