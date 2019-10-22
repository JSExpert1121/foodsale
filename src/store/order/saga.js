import {
    ORDER_REQ_AVAILABLE_COUPON,
    ORDER_REQ_AVAILABLE_DISCOUNT,
    ORDER_REQ_CREATE,
    ORDER_REQ_DINING_CODES,
    ORDER_REQ_DINING_DETAIL
} from '../constants';
import OrderApi from '../../service/order';
import * as OrderAction from './actions';

import { put, takeEvery, all, call } from 'redux-saga/effects';

function* getCoupons({ payload }) {
    const { token, items } = payload;
    try {
        yield put(OrderAction.processing());
        const data = yield call(OrderApi.getCoupons, token, items);
        yield put(OrderAction.couponsSuccess(data));
    } catch (error) {
        console.log('OrderSaga.getCoupons: ', error);
        yield put(OrderAction.processFailed('The given data was invalid'));
    }
}

function* getFulloffs({ payload }) {
    const { token, items } = payload;
    try {
        yield put(OrderAction.processing());
        const data = yield call(OrderApi.getFulloffs, token, items);
        yield put(OrderAction.fulloffSuccess(data));
    } catch (error) {
        console.log('OrderSaga.getFulloffs: ', error);
        yield put(OrderAction.processFailed('The given data was invalid'));
    }
}

function* create({ payload }) {
    const { token, items, coupon } = payload;
    try {
        yield put(OrderAction.processing());
        const data = yield call(OrderApi.create, token, items, coupon);
        yield put(OrderAction.createSuccess(data));
        yield put(OrderAction.resetShopping());
    } catch (error) {
        console.log('OrderSaga.create: ', error);
        yield put(OrderAction.processFailed('The given data was invalid'));
    }
}

function* getDiningCodes({ payload }) {
    try {
        yield put(OrderAction.processing());
        const data = yield call(OrderApi.getDiningCodes, payload);
        yield put(OrderAction.diningSuccess(data.data));
    } catch (error) {
        console.log('OrderSaga.getDiningCodes: ', error);
        yield put(OrderAction.processFailed('The given data was invalid'));
    }
}

function* getDiningDetail({ payload }) {
    const { token, id } = payload;
    try {
        yield put(OrderAction.clearOrderDetail());
        yield put(OrderAction.processing());
        const data = yield call(OrderApi.getDiningDetail, token, id);
        yield put(OrderAction.diningDetailSuccess(data.data));
    } catch (error) {
        console.log('OrderSaga.getDiningDetail: ', error);
        yield put(OrderAction.processFailed('The given data was invalid'));
    }
}

function* orderSaga() {
    yield all([
        takeEvery(ORDER_REQ_AVAILABLE_COUPON, getCoupons),
        takeEvery(ORDER_REQ_AVAILABLE_DISCOUNT, getFulloffs),
        takeEvery(ORDER_REQ_CREATE, create),
        takeEvery(ORDER_REQ_DINING_CODES, getDiningCodes),
        takeEvery(ORDER_REQ_DINING_DETAIL, getDiningDetail)
    ]);
}

export default orderSaga;
