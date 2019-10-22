import {
    ACCOUNT_REQ_BALANCE_HISTORY,
    ACCOUNT_REQ_POINT_HISTORY,
    ACCOUNT_REQ_PENDING_ORDER,
    ACCOUNT_REQ_PAID_ORDER,
    ACCOUNT_REQ_COMPLETE_ORDER,
    ACCOUNT_REQ_WAITING_COMMENT,
    ACCOUNT_REQ_ALREADY_COMMENT,
    ACCOUNT_REQ_COUPONS,
    ACCOUNT_REQ_UPLOAD_AVATAR,
    ACCOUNT_REQ_UPDATE_PROFILE,
    ACCOUNT_REQ_CHANGE_PASSWORD,
    ACCOUNT_REQ_UPDATE_PUSHER,
} from '../constants';

import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as AccountAction from './actions';
import * as AuthAction from '../auth/actions';
import AccountApi from '../../service/account';


function* getBalanceHistory({ payload }) {
    const { start_id, size, token } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getBalanceHistory, token, start_id, size);
        if (start_id === 0)
            yield put(AccountAction.balanceSuccess(data.data));
        else
            yield put(AccountAction.balanceMoreSuccess(data.data));
    } catch (error) {
        console.log('AccountSaga.getBalanceHistory: ', error);
        yield put(AccountAction.processFailed('getBalanceHistory failed'));
    }
}

function* getPointHistory({ payload }) {
    const { start_id, size, token } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getPointHistory, token, start_id, size);
        if (start_id === 0)
            yield put(AccountAction.pointSuccess(data.data));
        else
            yield put(AccountAction.pointMoreSuccess(data.data));
    } catch (error) {
        console.log('AccountSaga.getPointHistory: ', error);
        yield put(AccountAction.processFailed('getPointHistory failed'));
    }
}

function* getPendingOrders({ payload }) {
    const { start_id, size, token } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getPendingOrders, token, start_id, size);
        if (start_id === 0)
            yield put(AccountAction.pendingOrderSuccess(data.data));
        else
            yield put(AccountAction.pendingOrderMoreSuccess(data.data));
    } catch (error) {
        console.log('AccountSaga.getPendingOrders: ', error);
        yield put(AccountAction.processFailed('getPendingOrders failed'));
    }
}

function* getPaidOrders({ payload }) {
    const { start_id, size, token } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getPaidOrders, token, start_id, size);
        if (start_id === 0)
            yield put(AccountAction.paidOrderSuccess(data.data));
        else
            yield put(AccountAction.paidOrderMoreSuccess(data.data));
    } catch (error) {
        console.log('AccountSaga.getPaidOrders: ', error);
        yield put(AccountAction.processFailed('getPaidOrders failed'));
    }
}

function* getCompletedOrders({ payload }) {
    const { start_id, size, token } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getCompletedOrders, token, start_id, size);
        if (start_id === 0)
            yield put(AccountAction.completeOrderSuccess(data.data));
        else
            yield put(AccountAction.completeOrderMoreSuccess(data.data));
    } catch (error) {
        console.log('AccountSaga.getCompletedOrders: ', error);
        yield put(AccountAction.processFailed('getCompletedOrders failed'));
    }
}

function* getWaitingComments({ payload }) {
    const { start_id, size, token } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getWaitingComments, token, start_id, size);
        if (start_id === 0)
            yield put(AccountAction.waitingCommentSuccess(data.data));
        else
            yield put(AccountAction.waitingCommentMoreSuccess(data.data));
    } catch (error) {
        console.log('AccountSaga.getWaitingComments: ', error);
        yield put(AccountAction.processFailed('getWaitingComments failed'));
    }
}

function* getComments({ payload }) {
    const { start_id, size, token } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getComments, token, start_id, size);
        if (start_id === 0)
            yield put(AccountAction.alreadyCommentSuccess(data.data));
        else
            yield put(AccountAction.alreadyCommentMoreSuccess(data.data));
    } catch (error) {
        console.log('AccountSaga.getComments: ', error);
        yield put(AccountAction.processFailed('getComments failed'));
    }
}

function* getCoupons({ payload }) {
    const { start_id, size, token, status } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.getCoupons, token, start_id, size, status);
        if (start_id === 0)
            yield put(AccountAction.couponsSuccess(data.data, status));
        else
            yield put(AccountAction.couponsMoreSuccess(data.data, status));
    } catch (error) {
        console.log('AccountSaga.getCoupons: ', error);
        yield put(AccountAction.processFailed('getCoupons failed'));
    }
}

function* uploadAvatar({ payload }) {
    const { token, file } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.uploadAvatar, token, file);
        yield put(AuthAction.avatarChanged(data.data));
    } catch (error) {
        console.log('AccountSaga.uploadAvatar: ', error);
        yield put(AccountAction.processFailed('uploadAvatar failed'));
    }
}

function* updateProfile({ payload }) {
    const { token, nick_name, gender, birthday } = payload;
    try {
        yield put(AccountAction.processing());
        const data = yield call(AccountApi.updateProfile, token, nick_name, gender, birthday);
        yield put(AuthAction.profileChanged(data.data));
    } catch (error) {
        console.log('AccountSaga.updateProfile: ', error);
        yield put(AccountAction.processFailed('updateProfile failed'));
    }
}

function* changePassword({ payload }) {
    const { token, old_password, password, password_confirmation } = payload;
    try {
        yield put(AccountAction.processing());
        yield call(AccountApi.changePassword, token, old_password, password, password_confirmation);
        yield put(AccountAction.changePassSuccess());
    } catch (error) {
        console.log('AccountSaga.changePassword: ', error);
        yield put(AccountAction.processFailed('changePassword failed'));
    }
}

function* updatePusher({ payload }) {
    const { token, pusher_id } = payload;
    try {
        yield put(AccountAction.processing());
        yield call(AccountApi.updatePusher, token, pusher_id);
        yield put(AccountAction.updatePusherSuccess());
    } catch (error) {
        console.log('AccountSaga.updatePusher: ', error);
        yield put(AccountAction.processFailed('updatePusher failed'));
    }
}


function* accountSaga() {
    yield all([
        takeEvery(ACCOUNT_REQ_BALANCE_HISTORY, getBalanceHistory),
        takeEvery(ACCOUNT_REQ_POINT_HISTORY, getPointHistory),
        takeEvery(ACCOUNT_REQ_PENDING_ORDER, getPendingOrders),
        takeEvery(ACCOUNT_REQ_PAID_ORDER, getPaidOrders),
        takeEvery(ACCOUNT_REQ_COMPLETE_ORDER, getCompletedOrders),
        takeEvery(ACCOUNT_REQ_WAITING_COMMENT, getWaitingComments),
        takeEvery(ACCOUNT_REQ_ALREADY_COMMENT, getComments),
        takeEvery(ACCOUNT_REQ_COUPONS, getCoupons),
        takeEvery(ACCOUNT_REQ_UPLOAD_AVATAR, uploadAvatar),
        takeEvery(ACCOUNT_REQ_UPDATE_PROFILE, updateProfile),
        takeEvery(ACCOUNT_REQ_CHANGE_PASSWORD, changePassword),
        takeEvery(ACCOUNT_REQ_UPDATE_PUSHER, updatePusher),
    ]);
}

export default accountSaga;
