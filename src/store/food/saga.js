import {
    FOOD_REQ_SALEABLE,
    FOOD_REQ_SALE_TIME,
    FOOD_REQ_POPULAR,
    FOOD_REQ_INTEREST,
    FOOD_REQ_DETAIL,
    FOOD_REQ_COMMENT,
    FOOD_REQ_SPECIALS
} from '../constants';
import FoodApi from '../../service/food';
import CommentApi from '../../service/comment';
import * as FoodAction from './actions';

import { put, takeEvery, all, call } from 'redux-saga/effects';

function* getSaleFood({ payload }) {
    const { token, outlet, catId, date } = payload;
    try {
        yield put(FoodAction.processing());
        const data = yield call(FoodApi.getSaleFood, token, outlet, catId, date);
        yield put(FoodAction.saleableSuccess(data.data));
    } catch (error) {
        console.log('FoodSaga.getSaleFood: ', error);
        yield put(FoodAction.processFailed('The given data was invalid'));
    }
}

function* getSaleTimes({ payload }) {
    try {
        yield put(FoodAction.processing());
        const data = yield call(FoodApi.getSaleTimes, payload);
        yield put(FoodAction.timeSuccess(data.data));
    } catch (error) {
        console.log('FoodSaga.getSaleTimes: ', error);
        yield put(FoodAction.processFailed('The given data was invalid'));
    }
}

function* getPopularFood({ payload }) {
    const { token, outlet } = payload;
    try {
        yield put(FoodAction.processing());
        const data = yield call(FoodApi.getPopularFood, token, outlet);
        yield put(FoodAction.popularSuccess(data.data));
    } catch (error) {
        console.log('FoodSaga.getPopularFood: ', error);
        yield put(FoodAction.processFailed('The given data was invalid'));
    }
}

function* getInterestFood({ payload }) {
    const { token, outlet } = payload;
    try {
        yield put(FoodAction.processing());
        const data = yield call(FoodApi.getInterestFood, token, outlet);
        yield put(FoodAction.interestSuccess(data.data));
    } catch (error) {
        console.log('FoodSaga.getInterestFood: ', error);
        yield put(FoodAction.processFailed('The given data was invalid'));
    }
}

function* getFoodDetail({ payload }) {
    const { token, foodId } = payload;
    try {
        yield put(FoodAction.processing());
        const data = yield call(FoodApi.getFoodDetail, token, foodId);
        yield put(FoodAction.detailSuccess(data.data));
    } catch (error) {
        console.log('FoodSaga.getFoodDetail: ', error);
        yield put(FoodAction.processFailed('The given data was invalid'));
    }
}

function* getFoodComments({ payload }) {
    const { token, foodId, start_id, size } = payload;
    try {
        yield put(FoodAction.processing());
        const data = yield call(CommentApi.getFoodComments, token, foodId, start_id, size);
        yield put(FoodAction.commentSuccess(data.data));
    } catch (error) {
        console.log('FoodSaga.getFoodComments: ', error);
        yield put(FoodAction.processFailed('The given data was invalid'));
    }
}

function* getSpecialFoods({ payload }) {
    const { token, outlet, date } = payload;
    try {
        yield put(FoodAction.processing());
        const data = yield call(FoodApi.getSpecialFoods, token, outlet, date);
        yield put(FoodAction.specialsSuccess(data.data));
    } catch (error) {
        console.log('FoodSaga.getSpecialFoods: ', error);
        yield put(FoodAction.processFailed('The given data was invalid'));
    }
}

function* foodSaga() {
    yield all([
        takeEvery(FOOD_REQ_SALEABLE, getSaleFood),
        takeEvery(FOOD_REQ_SALE_TIME, getSaleTimes),
        takeEvery(FOOD_REQ_POPULAR, getPopularFood),
        takeEvery(FOOD_REQ_INTEREST, getInterestFood),
        takeEvery(FOOD_REQ_DETAIL, getFoodDetail),
        takeEvery(FOOD_REQ_COMMENT, getFoodComments),
        takeEvery(FOOD_REQ_SPECIALS, getSpecialFoods)
    ]);
}

export default foodSaga;
