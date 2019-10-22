import {
    DISCOVER_REQ_ARTICLES,
    DISCOVER_REQ_COMMENTS
} from '../constants';
import FoodApi from '../../service/food';
import DiscoverApi from '../../service/discover';
import * as DiscoverAction from './actions';

import { put, takeEvery, all, call } from 'redux-saga/effects';

function* getArticles({ payload }) {
    const { token, start, size } = payload;
    try {
        yield put(DiscoverAction.processing());
        const data = yield call(DiscoverApi.getArticles, token, start, size);
        yield put(DiscoverAction.articlesSuccess(data.data));
    } catch (error) {
        console.log('DiscSaga.getArticles: ', error);
        yield put(DiscoverAction.processFailed('The given data was invalid'));
    }
}

function* getComments({ payload }) {
    const { token, start, size } = payload;
    try {
        yield put(DiscoverAction.processing());
        const data = yield call(DiscoverApi.getComments, token, start, size);
        yield put(DiscoverAction.commentsSuccess(data.data));
    } catch (error) {
        console.log('DiscSaga.getComments: ', error);
        yield put(DiscoverAction.processFailed('The given data was invalid'));
    }
}

function* discSaga() {
    yield all([
        takeEvery(DISCOVER_REQ_ARTICLES, getArticles),
        takeEvery(DISCOVER_REQ_COMMENTS, getComments),
    ]);
}

export default discSaga
