import RestClient from './base';
import * as config from "../config";

const CONF_API_PATH = config.SERVICE_API_URL + '/config/payment_gateway';
const DEPOSIT_API_PATH = config.SERVICE_API_URL + '/deposit/active_list';
const PAY_API_PATH = config.SERVICE_API_URL + '/pay/';

export default {
    getPaymentConfig: token => RestClient.authFetch(CONF_API_PATH, token),
    getActiveList: token => RestClient.authFetch(DEPOSIT_API_PATH, token),
    appPay: (token, orderNo, gateway) => RestClient.authFetch(
        PAY_API_PATH + 'app_pay',
        token, { order_no: orderNo, payment_gateway: gateway }
    ),
    scanPay: (token, orderNo, gateway) => RestClient.authFetch(
        PAY_API_PATH + 'scan_pay',
        token, { order_no: orderNo, payment_gateway: gateway }
    )
}