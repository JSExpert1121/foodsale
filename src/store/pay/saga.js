import {
    CONFIG_REQ_PAYMENT_GATEWAY,
    PAY_REQ_APP_PAY,
    PAY_REQ_SCAN_PAY,
    DEPOSIT_REQ_ACTIVE_LIST
} from '../constants';
import PayApi from '../../service/pay';
import * as PayAction from './actions';

import { put, takeEvery, all, call } from 'redux-saga/effects';

function* getGatewayConfig({ payload }) {
    try {
        yield put(PayAction.processing());
        const data = yield call(PayApi.getPaymentConfig, payload);
        yield put(PayAction.gatewaySuccess(data.data));
    } catch (error) {
        console.log('PaySaga.getGatewayConfig: ', error);
        yield put(PayAction.processFailed('The given data was invalid'));
    }
}

function* getActiveList({ payload }) {
    try {
        yield put(PayAction.processing());
        const data = yield call(PayApi.getActiveList, payload);
        yield put(PayAction.giftsSuccess(data.data));
    } catch (error) {
        console.log('PaySaga.getActiveList: ', error);
        yield put(PayAction.processFailed('The given data was invalid'));
    }
}

function* appPay({ payload }) {
    const { token, order, gateway } = payload;
    try {
        yield put(PayAction.processing());
        const data = yield call(PayApi.appPay, token, order, gateway);
        yield put(PayAction.paySuccess(data));
    } catch (error) {
        console.log('PaySaga.appPay: ', error);
        yield put(PayAction.processFailed('The given data was invalid'));
    }
}

function* paySaga() {
    yield all([
        takeEvery(CONFIG_REQ_PAYMENT_GATEWAY, getGatewayConfig),
        takeEvery(DEPOSIT_REQ_ACTIVE_LIST, getActiveList),
        takeEvery(PAY_REQ_APP_PAY, appPay),
    ]);
}

export default paySaga
