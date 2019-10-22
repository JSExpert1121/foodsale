import {
    USER_REQ_RECENT_NETWORK,
    USER_REQ_CURRENT_NETWORK,
    USER_REQ_ADD_NETWORK,
    USER_REQ_ASSIGNABLE_COUPON,
    USER_REQ_ASSIGN_COUPON
} from '../constants';
import UserApi from '../../service/user';
import * as UserAction from './actions';
import * as FoodAction from '../food/actions';
import * as AccountAction from '../accounts/actions';

import { put, takeEvery, all, call } from 'redux-saga/effects';

function* getRecentNetworks({ payload }) {
    try {
        yield put(UserAction.processing());
        const data = yield call(UserApi.getRecentNetworks, payload);
        yield put(UserAction.recentSuccess(data.data));
    } catch (error) {
        yield put(UserAction.processFailed('The given data was invalid'));
    }
}

function* getCurrentNetwork({ payload }) {
    try {
        yield put(UserAction.processing());
        const data = yield call(UserApi.getCurrentNetwork, payload);
        yield put(UserAction.currentSuccess(data.data));
    } catch (error) {
        console.log('UserSaga.getCurrentNetwork: ', error);
        yield put(UserAction.processFailed('The given data was invalid'));
    }
}

function* addNetwork({ payload }) {
    const { token, outlet } = payload;
    try {
        yield put(UserAction.processing());
        yield call(UserApi.addNetwork, token, outlet);
        yield put(UserAction.processSuccess('Add Network success'));
        yield put(UserAction.getRecentNetworks(token));
        yield put(UserAction.getCurrentNetwork(token));
        yield all([
            put(FoodAction.getInterestFood(token, outlet)),
            put(FoodAction.getPopularFood(token, outlet)),
        ]);
    } catch (error) {
        console.log('UserSaga.addNetwork: ', error);
        yield put(UserAction.processFailed('The given data was invalid'));
    }
}

function* getCoupons({ payload }) {
    try {
        yield put(UserAction.processing());
        const data = yield call(UserApi.getCoupons, payload);
        yield put(UserAction.couponsSuccess(data.data));
    } catch (error) {
        console.log('UserSaga.getCoupons: ', error);
        yield put(UserAction.processFailed('The given data was invalid'));
    }
}

function* assignCoupon({ payload }) {
    const { token, couponId } = payload;
    try {
        yield put(UserAction.processing());
        yield call(UserApi.assignCoupon, token, couponId);
        yield put(UserAction.processSuccess('Assign Coupon success'));
        yield put(UserAction.getCoupons(token));
        yield put(AccountAction.getCoupons(token, 0, 20, 'available'));
        yield put(AccountAction.getCoupons(token, 0, 20, 'used'));
        yield put(AccountAction.getCoupons(token, 0, 20, 'assignable'));
    } catch (error) {
        console.log('UserSaga.assignCoupon: ', error);
        yield put(UserAction.processFailed('The given data was invalid'));
    }
}

function* authSaga() {
    yield all([
        takeEvery(USER_REQ_RECENT_NETWORK, getRecentNetworks),
        takeEvery(USER_REQ_CURRENT_NETWORK, getCurrentNetwork),
        takeEvery(USER_REQ_ADD_NETWORK, addNetwork),
        takeEvery(USER_REQ_ASSIGNABLE_COUPON, getCoupons),
        takeEvery(USER_REQ_ASSIGN_COUPON, assignCoupon),
    ]);
}

export default authSaga
