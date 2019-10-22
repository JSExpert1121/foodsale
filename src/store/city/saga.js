import {
    CITY_REQ_ACTIVE,
    CITY_REQ_NEARBY
} from '../constants';
import CityApi from '../../service/city';
import * as CityAction from './actions';
import * as UserAction from '../user/actions';

import { put, takeEvery, all, call } from 'redux-saga/effects';

function* getActiveCities({ payload }) {
    try {
        yield put(CityAction.processing());
        const data = yield call(CityApi.getActiveCities, payload);
        yield put(CityAction.activeSuccess(data.data));
    } catch (error) {
        console.log('UserSaga.getActiveCities: ', error);
        yield put(CityAction.processFailed('The given data was invalid'));
    }
}

function* getNearbyNetworks({ payload }) {
    const { token, lat, lng, radius, city } = payload;
    try {
        yield put(CityAction.processing());
        const data = yield call(CityApi.getNearbyNetworks, token, lat, lng, radius, city && city.code);
        yield put(CityAction.nearbySuccess(data.data));
        yield put(UserAction.setCity(city));
    } catch (error) {
        console.log('UserSaga.getNearbyNetworks: ', error);
        yield put(CityAction.processFailed('The given data was invalid'));
    }
}

function* citySaga() {
    yield all([
        takeEvery(CITY_REQ_ACTIVE, getActiveCities),
        takeEvery(CITY_REQ_NEARBY, getNearbyNetworks)
    ]);
}

export default citySaga;
