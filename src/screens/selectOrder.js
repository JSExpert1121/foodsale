import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import { connect } from "react-redux";
import { zaodian } from '../common/image';
import { Actions } from 'react-native-router-flux';
import HeaderBar from './header';
import { Calendar } from 'react-native-calendars';
import * as OrderAction from '../store/order/actions';

class SelectOrder extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: undefined,
        }
    }

    onDateChange = (date) => {
        this.setState({ currentDate: date });
    }

    onTimePress = cat => {
        const { currentDate } = this.state;
        const day = currentDate ? new Date(currentDate.dateString) : Date.now();
        const title = currentDate ? currentDate.year + '年 ' + currentDate.month + '月 ' + currentDate.day + '日' : day.getFullYear() + '年 ' + (day.getMonth() + 1) + '月 ' + day.getDate() + '日';
        this.props.setOrderTime(day, cat.id);
        Actions.Breakfast({ catId: cat.id, title: title, date: day });
    }

    render() {
        const { time } = this.props
        return (
            <View style={styles.root}>
                <HeaderBar title={'选择订餐'} />
                <View style={{ height: 20 }} />
                <Calendar
                    minDate={Date()}
                    onDayPress={this.onDateChange}
                    monthFormat={'yyyy年 MM月'}
                    firstDay={1}
                    showWeekNumbers={true}
                    markedDates={{ [this.state.currentDate.dateString]: { selected: true, selectedColor: 'blue' } }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    {
                        time && time.map(cat => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => this.onTimePress(cat)}
                                style={styles.categoryItemContainer}
                            >
                                <Image source={zaodian} style={styles.categoryPicture} />
                                <Text style={{ textAlign: 'center' }}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    time: state.food.time,
});

const mapDispatchToProps = dispatch => ({
    setOrderTime: (date, id) => dispatch(OrderAction.setOrderTime(date, id)),
});

export default SelectOrder = connect(mapStateToProps, mapDispatchToProps)(SelectOrder);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    categoryItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    categoryPicture: {
        width: 50,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 5
    },
})