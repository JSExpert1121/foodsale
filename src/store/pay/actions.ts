import {
    CONFIG_REQ_PAYMENT_GATEWAY,
    CONFIG_PAYMENT_GATEWAY_SUCCESS,
    DEPOSIT_REQ_ACTIVE_LIST,
    DEPOSIT_ACTIVE_LIST_SUCCESS,
    PAY_REQ_APP_PAY,
    PAY_REQ_SCAN_PAY,
    PAY_REQ_SUCCESS,
    PROCESSING_DATA,
    PROCESS_FAILURE
} from '../constants'

export const processing = () => ({
    type: PROCESSING_DATA
});

export const processFailed = msg => ({
    type: PROCESS_FAILURE,
    payload: msg
})

export const getGatewayConfigs = (token: string) => ({
    type: CONFIG_REQ_PAYMENT_GATEWAY,
    payload: token
});

export const getActiveList = (token: string) => ({
    type: DEPOSIT_REQ_ACTIVE_LIST,
    payload: token
});

export const appPay = (token, gateway, order) => ({
    type: PAY_REQ_APP_PAY,
    payload: { token, gateway, order }
});

export const scanPay = (token, gateway, order) => ({
    type: PAY_REQ_SCAN_PAY,
    payload: { token, gateway, order }
});

export const gatewaySuccess = (data) => ({
    type: CONFIG_PAYMENT_GATEWAY_SUCCESS,
    payload: data
});

export const giftsSuccess = (data) => ({
    type: DEPOSIT_ACTIVE_LIST_SUCCESS,
    payload: data
});

export const paySuccess = (data) => ({
    type: PAY_REQ_SUCCESS,
    payload: data
});