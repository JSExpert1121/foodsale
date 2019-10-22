import {
    USER_REQ_RECENT_NETWORK,
    USER_REQ_CURRENT_NETWORK,
    USER_REQ_ADD_NETWORK,
    USER_REQ_ASSIGNABLE_COUPON,
    USER_REQ_ASSIGN_COUPON,
    USER_RECENT_SUCCESS,
    USER_CURRENT_SUCCESS,
    USER_ASSIGNABLE_SUCCESS,
    USER_SET_LOCATION,
    USER_SET_CITY,
    PROCESSING_DATA,
    PROCESS_SUCCESS,
    PROCESS_FAILURE,
} from '../constants'

export const processing = () => ({
    type: PROCESSING_DATA
});

export const processSuccess = msg => ({
    type: PROCESS_SUCCESS,
    payload: msg
});

export const processFailed = msg => ({
    type: PROCESS_FAILURE,
    payload: msg
})

export const getRecentNetworks = (token: string) => ({
    type: USER_REQ_RECENT_NETWORK,
    payload: token
});

export const getCurrentNetwork = (token: string) => ({
    type: USER_REQ_CURRENT_NETWORK,
    payload: token
});

export const addNetwork = (token: string, outlet: number) => ({
    type: USER_REQ_ADD_NETWORK,
    payload: {
        token, outlet
    }
});

export const getCoupons = (token: string) => ({
    type: USER_REQ_ASSIGNABLE_COUPON,
    payload: token
});

export const assignCoupon = (token: string, id: string) => ({
    type: USER_REQ_ASSIGN_COUPON,
    payload: {
        token, couponId: id
    }
});

export const recentSuccess = (data) => ({
    type: USER_RECENT_SUCCESS,
    payload: data
});

export const currentSuccess = (data) => ({
    type: USER_CURRENT_SUCCESS,
    payload: data
});

export const couponsSuccess = (data) => ({
    type: USER_ASSIGNABLE_SUCCESS,
    payload: data
});

export const setPosition = (lat, lng) => ({
    type: USER_SET_LOCATION,
    payload: { lat, lng }
});

export const setCity = (city) => ({
    type: USER_SET_CITY,
    payload: city
});
