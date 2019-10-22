import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
import { connect } from "react-redux";
import {
    wancan, categoryBackground, noUser, stick2, star, plus,
    homeOutline, homeFill, forkFill, forkOutline, magnifierOutline, magnifierFill, customerOutline, customerFill
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchData } from '../store/auth/actions'
import { Actions } from 'react-native-router-flux';
import HeaderBar from './header'
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const starArray = [
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
]

const FoodItem = ({ orderStatus, price, name }) => {
    return (
        <TouchableOpacity onPress={() => { }} style={styles.foodItem}>
            <Image source={wancan} style={styles.itemImageContainer} />
            <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 16, color: commonColors.accentColor }}> {name}</Text>
                <View style={{ height: 3 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>下单时间 2019-02-14 8:30</Text>
                </View>
                <View style={{ height: 3 }} />
                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>总价 ¥ {price}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 30, borderRadius: 3, backgroundColor: orderStatus == 'done' ? 'grey' : commonColors.limeGreen }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>{orderStatus == 'done' ? '已取餐' : '未取餐'}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
        </TouchableOpacity>
    )
}
class WaitingBring extends PureComponent {
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
    componentWillReceiveProps(props) {

    }
    renderReviewItem() {
        return (
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 6 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Image source={noUser} style={{ width: 44, height: 44, borderRadius: 22 }} />
                        <View style={{ width: 10 }} />
                        <View style={{ flex: 1, paddingVertical: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={[commonStyles.accentFont, { fontSize: 14 }]}>小胖砸</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={[commonStyles.contentFont, { fontSize: 14 }]}>{"2019.2.14"}</Text>
                            </View>
                            <Text style={[commonStyles.contentFont, { fontSize: 14, marginTop: 3 }]}>味道还不错。</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    renderMenus() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                <View style={styles.categoryMenuContainer}>
                    <Image source={categoryBackground} style={styles.menuPicture} />
                    <View style={{ position: 'absolute', left: 13, top: 13 }}>
                        <Text style={{ fontSize: 14 }}>预定</Text>
                        <View style={{ height: 5 }} />
                        <Text style={{ fontSize: 10 }}>提前预定有优惠</Text>
                    </View>
                    <Text style={styles.cornerLabel}>热</Text>
                </View>
                <View style={styles.categoryMenuContainer}>
                    <Image source={categoryBackground} style={styles.menuPicture} />
                    <View style={{ position: 'absolute', left: 13, top: 13 }}>
                        <Text style={{ fontSize: 14 }}>每日特色</Text>
                        <View style={{ height: 5 }} />
                        <Text style={{ fontSize: 10 }}>特色餐品又会多多</Text>
                    </View>
                    <Text style={styles.cornerLabel}>热</Text>
                </View>
                <View style={styles.categoryMenuContainer}>
                    <Image source={categoryBackground} style={styles.menuPicture} />
                    <View style={{ position: 'absolute', left: 13, top: 13 }}>
                        <Text style={{ fontSize: 14 }}>选材</Text>
                        <View style={{ height: 5 }} />
                        <Text style={{ fontSize: 10 }}>选材，配送，鲜食</Text>
                    </View>
                    <Text style={styles.cornerLabel}>热</Text>
                </View>
            </View>
        )
    }
    renderStick() {
        return (
            <ImageBackground source={stick2} style={styles.stick2Container}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 8, color: 'white' }}>优惠多多  好礼送下听</Text>
                    <Text style={{ fontSize: 16, color: 'white' }}>充 值 有 礼</Text>
                </View>
                <View style={{ width: '20%' }} />
                <View style={{ flex: 1 }}>
                    <LinearGradient
                        colors={['#f44242', '#f47142']}
                        start={[1, 0]}
                        end={[1, 1]}
                        style={{ paddingLeft: 10 }}
                    >
                        <Text style={{ fontSize: 8, color: 'white' }}>充 200 送 200</Text>
                    </LinearGradient>
                    <View style={{ height: 3 }} />
                    <LinearGradient
                        colors={['#f44242', '#f47142']}
                        start={[1, 0]}
                        end={[1, 1]}
                        style={{ paddingLeft: 10 }}
                    >
                        <Text style={{ fontSize: 8, color: 'white' }}>充 100 送 60</Text>
                    </LinearGradient>
                </View>
                <View style={{ flex: 1 }} />
            </ImageBackground>
        )

    }
    renderSection() {
        let { selectedMode } = this.state
        return (
            <View style={{ borderTopColor: '#5fe5bc', borderTopWidth: 1, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, width: '100%', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 0 }) }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 0 ? homeFill : homeOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 1 }) }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 1 ? forkFill : forkOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 2 }); Actions.Find() }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 2 ? magnifierFill : magnifierOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ selectedMode: 3 }) }} style={styles.buttonContainer}>
                    <Image source={selectedMode == 3 ? customerFill : customerOutline} style={styles.buttonStyle} />
                </TouchableOpacity>
            </View>
        )

    }
    renderReserve() {
        return (
            <View>
                <Calendar
                    current={'2019-06-01'}
                    minDate={'2012-05-10'}
                    maxDate={'2020-05-30'}
                    onDayPress={day => {
                        console.log('selected day', day);
                        this.state.markedDates[day.dateString] = { selected: true, selectedColor: 'red' }
                        console.log('this.state.markedDates----', this.state.markedDates)
                        this.setState({ markedDates: { ...this.state.markedDates } })
                    }}
                    monthFormat={'yyyy 年 MM 月'}
                    onMonthChange={month => {
                        console.log('month changed', month);
                    }}
                    hideArrows={false}
                    hideExtraDays={true}
                    disableMonthChange={true}
                    firstDay={1}
                    markedDates={this.state.markedDates}
                />
                <View style={{ height: 15 }} />
                <FoodItem orderStatus={'done'} name={'牛肉'} price={20.08} key={'1'} />
                <FoodItem name={'牛肉'} price={20.08} key={'2'} />
            </View>
        )
    }
    renderMode() {
        return (
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'buy' }) }} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <View style={{ flex: 1 }} />
                    <Text style={[styles.searchOption, { color: this.state.mode == 'buy' ? commonColors.limeGreen : commonColors.accentColor }]}>已购</Text>
                    <View style={{ height: 7 }} />
                    {
                        this.state.mode == 'buy' &&
                        <View style={{ height: 3, width: 45, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'reserve' }) }} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <View style={{ flex: 1 }} />
                    <Text style={[styles.searchOption, { color: this.state.mode == 'reserve' ? commonColors.limeGreen : commonColors.accentColor }]}>已预定</Text>
                    <View style={{ height: 7 }} />
                    {
                        this.state.mode == 'reserve' &&
                        <View style={{ height: 3, width: 45, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
            </View>
        )

    }
    renderBuy() {
        return (
            <ScrollView style={{ backgroundColor: "white" }}>
                <Text style={styles.noMessage}>您暂时还没有订单哦～</Text>
                <FoodItem orderStatus={'done'} name={'牛肉'} price={20.08} key={'1'} />
                <FoodItem name={'牛肉'} price={20.08} key={'2'} />
            </ScrollView>
        )
    }
    render() {
        var props = this.props
        return (
            <View style={{ flex: 1 }}>
                <HeaderBar
                    title={'待取餐'}
                />
                <ScrollView style={{ backgroundColor: "white" }}>
                    <FoodItem orderStatus={'done'} name={'牛肉'} price={20.08} key={'1'} />
                    <FoodItem name={'牛肉'} price={20.08} key={'2'} />
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


export default WaitingBring = connect(mapStateToProps, mapDispatchToProps)(WaitingBring);

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
    bannerContainer: {
        width: screenWidth,
        height: screenHeight / 3
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