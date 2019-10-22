import {
    ORDER_REQ_AVAILABLE_COUPON,
    ORDER_REQ_AVAILABLE_DISCOUNT,
    ORDER_REQ_CREATE,
    ORDER_REQ_DINING_CODES,
    ORDER_REQ_DINING_DETAIL,
    ORDER_REQ_CLEAR_DETAIL,

    ORDER_INCREASE_FOOD,
    ORDER_DECREASE_FOOD,

    ORDER_AVAILABLE_COUPON_SUCCESS,
    ORDER_AVAILABLE_FULLOFF_SUCCESS,
    ORDER_CREATE_SUCCESS,
    ORDER_DINING_SUCCESS,
    ORDER_DINING_DETAIL_SUCESS,
    PROCESSING_DATA,
    PROCESS_FAILURE,
    ORDER_SET_COUPON,
    ORDER_RESET_SHOPPING,
    ORDER_SET_ORDER_TIME,
} from '../constants'

export const processing = () => ({
    type: PROCESSING_DATA
});

export const processFailed = msg => ({
    type: PROCESS_FAILURE,
    payload: msg
})

export const getAvailableCoupons = (token: string, items: Array<any>) => ({
    type: ORDER_REQ_AVAILABLE_COUPON,
    payload: { token, items }
});

export const getAvailableFulloffs = (token: string, items: Array<any>) => ({
    type: ORDER_REQ_AVAILABLE_DISCOUNT,
    payload: { token, items }
});

export const create = (token: string, items: Array<any>, coupon: number) => ({
    type: ORDER_REQ_CREATE,
    payload: { token, items, coupon }
});

export const getDiningCodes = token => ({
    type: ORDER_REQ_DINING_CODES,
    payload: token
});

export const getDiningDetail = (token, id) => ({
    type: ORDER_REQ_DINING_DETAIL,
    payload: { token, id }
});

export const clearOrderDetail = () => ({
    type: ORDER_REQ_CLEAR_DETAIL
});

export const fulloffSuccess = (data) => ({
    type: ORDER_AVAILABLE_FULLOFF_SUCCESS,
    payload: data
});

export const createSuccess = (data) => ({
    type: ORDER_CREATE_SUCCESS,
    payload: data
});

export const diningSuccess = data => ({
    type: ORDER_DINING_SUCCESS,
    payload: data
});

export const diningDetailSuccess = data => ({
    type: ORDER_DINING_DETAIL_SUCESS,
    payload: data
});

export const couponsSuccess = (data) => ({
    type: ORDER_AVAILABLE_COUPON_SUCCESS,
    payload: data
});

export const increaseFood = (id, name, url, price) => ({
    type: ORDER_INCREASE_FOOD,
    payload: { id, name, url, price }
});

export const decreaseFood = id => ({
    type: ORDER_DECREASE_FOOD,
    payload: id
});

export const resetShopping = () => ({
    type: ORDER_RESET_SHOPPING
});

export const toggleCoupon = uid => ({
    type: ORDER_SET_COUPON,
    payload: uid
});

export const setOrderTime = (date, timeId) => ({
    type: ORDER_SET_ORDER_TIME,
    payload: { date, id: timeId }
})