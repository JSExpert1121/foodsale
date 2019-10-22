import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { plus, minus } from '../../common/image';

const FoodOrderItem = ({ image, name, price, count, handleIncrease, handleDecrease }) => {
    return (
        <TouchableOpacity style={styles.root}>
            <Image source={{ uri: image }} style={styles.container} />
            <View style={{ paddingLeft: 15 }}>
                <Text> {name}</Text>
                <View style={{ height: 12 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 18, width: 80 }}> ¥ {price}</Text>
                    {/* <Text style={{ marginLeft: 15, fontSize: 20, color: '#222222' }}>{`x ${count}`}</Text> */}
                </View>
            </View>
            <View style={{ flex: 1 }} />
            <View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.orderRoot}>
                    {count > 0 && (
                        <>
                            <TouchableOpacity activeOpacity={0.6} onPress={handleDecrease}>
                                <Image source={minus} style={styles.plusContainer} />
                            </TouchableOpacity>
                            <Text style={styles.count}> {count} </Text>
                        </>
                    )}
                    <TouchableOpacity activeOpacity={0.6} onPress={handleIncrease}>
                        <Image source={plus} style={styles.plusContainer} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    container: {
        width: 100,
        height: 80,
        marginLeft: 15
    },
    orderRoot: {
        position: 'absolute',
        right: 10,
        bottom: 5,
        padding: 5,
        flexDirection: 'row'
    },
    plusContainer: {
        width: 30,
        height: 30,
    },
    count: {
        fontSize: 24,
        width: 60,
        height: 30,
        textAlign: 'center'
    }
});

export default FoodOrderItem;