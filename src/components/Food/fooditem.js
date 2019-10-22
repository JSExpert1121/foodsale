import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { star, plus, minus } from '../../common/image';

const starArray = [
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
]

const FoodItem = ({ starCnt, price, name, image, handleSelect, addable, handleIncrease, handleDecrease, orderCount }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.root} onPress={handleSelect}>
            <Image source={{ uri: image }} style={styles.itemImageContainer} />
            <View style={{ paddingLeft: 15 }}>
                <Text> {name}</Text>
                <View style={{ height: 8 }} />
                <View style={{ flexDirection: 'row' }}>
                    {
                        starArray[starCnt - 1].map((item, index) => (
                            <Image source={star} style={styles.starContainer} key={index} />
                        ))
                    }
                </View>
                <View style={{ height: 8 }} />
                <Text style={{ color: 'red', fontSize: 18 }}> ¥ {price}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View>
                <View style={{ flex: 1 }}></View>
                {addable && (
                    <View style={styles.orderRoot}>
                        {orderCount > 0 && (
                            <>
                                <TouchableOpacity activeOpacity={0.6} onPress={handleDecrease}>
                                    <Image source={minus} style={styles.plusContainer} />
                                </TouchableOpacity>
                                <Text style={styles.count}> {orderCount} </Text>
                            </>
                        )}
                        <TouchableOpacity activeOpacity={0.6} onPress={handleIncrease}>
                            <Image source={plus} style={styles.plusContainer} />
                        </TouchableOpacity>
                    </View>
                )}
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
        borderBottomColor: '#e5e5e5',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 10,
        position: 'relative'
    },
    starContainer: {
        width: 15,
        height: 15,
        marginHorizontal: 2
    },
    itemImageContainer: {
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
})
export default FoodItem;