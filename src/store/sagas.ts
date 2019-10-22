import { take, fork, all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import userSaga from './user/saga';
import foodSaga from './food/saga';
import citySaga from './city/saga';
import orderSaga from './order/saga';
import paySaga from './pay/saga';
import accountSaga from './accounts/saga';
import discoverSaga from './discover/saga';

function* logSaga() {
    while (true) {
        const action = yield take('*');
        console.log('Saga.Log: ', action.type, action.payload);
    }
}

export default function* rootSaga() {
    yield fork(logSaga);
    yield fork(authSaga);
    yield fork(userSaga);
    yield fork(foodSaga);
    yield fork(citySaga);
    yield fork(orderSaga);
    yield fork(paySaga);
    yield fork(accountSaga);
    yield fork(discoverSaga);
}

