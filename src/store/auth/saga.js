import {
	AUTH_REQ_VERIFY_CODE,
	AUTH_REQ_REGISTER,
	AUTH_REQ_RECOVER_CODE,
	AUTH_REQ_RECOVER,
	AUTH_REQ_LOGIN,
	AUTH_REQ_LOGOUT,
	AUTH_REQ_REFRESH,
	AUTH_REQ_CURRENT_USER,
	AUTH_LOGIN_ERROR,
	AUTH_LOGOUT,
	AUTH_REQ_QLOGIN
} from '../constants';
import AuthApi from '../../service/auth';
import * as AuthAction from './actions';
import AsyncStorage from '@react-native-community/async-storage';

import { put, takeEvery, all, call, take, cancel, cancelled, fork } from 'redux-saga/effects';

function* login({ payload }) {
	const { account, password, callback } = payload;
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.login, account, password);
		yield put(AuthAction.loginSuccess(data.access_token));
		yield call(AsyncStorage.setItem, 'access_token', data.access_token);
		yield put(AuthAction.getUser(data.access_token));
		yield call(callback);
	} catch (error) {
		console.log('Saga: auth/login error', error)
		yield put(AuthAction.loginFailed('Login failed'));
		yield call(callback, '用户名或密码不正确');
	}
}

function* qlogin({ payload }) {
	const { account, code, callback } = payload;
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.quickLogin, account, code);
		yield put(AuthAction.loginSuccess(data.access_token));
		yield put(AuthAction.getUser(data.access_token));
		yield call(callback);
	} catch (error) {
		console.log('Saga: auth/login error', error)
		yield put(AuthAction.loginFailed('Login failed'));
		yield call(callback, '验证码不正确');
	}
}

function* logout(token) {
	try {
		yield call(AuthApi.logout, token);
	} catch (error) {
		console.log('AuthSaga.logout: ', error);
	} finally {
		yield put(AuthAction.loggedOut());
	}
}

function* getVerificationCode({ payload }) {
	console.log('AuthSaga.getVerificationCode: ', payload);
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.getVerifyCode, payload);
		yield put(AuthAction.processSuccess(data.message));
	} catch (error) {
		console.log('AuthSaga.getVerificationCode: ', error);
		yield put(AuthAction.processFailed('The given data was invalid'));
	}
}

function* register({ payload }) {
	const { account, password, password_confirmation, verify_code } = payload;
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.register, account, password, password_confirmation, verify_code);
		yield put(AuthAction.registerSuccess(data));
	} catch (error) {
		console.log('AuthSaga.register: ', error);
		yield put(AuthAction.processFailed('Register failed'));
	}
}

function* getRecoverCode({ payload }) {
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.getCodeForRecover, payload);
		yield put(AuthAction.processSuccess(data.message));
	} catch (error) {
		console.log('AuthSaga.register: ', error);
		yield put(AuthAction.processFailed('Get Recovering Code failed'));
	}
}

function* recover({ payload }) {
	const { account, password, password_confirmation, verify_code } = payload;
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.recoverPassword, account, password, password_confirmation, verify_code);
		yield put(AuthAction.processSuccess(data.message));
	} catch (error) {
		console.log('AuthSaga.recover: ', error);
		yield put(AuthAction.processFailed('Recover failed'));
	}
}

function* refresh({ payload }) {
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.refreshToken, payload);
		yield put(AuthAction.refreshSuccess(data));
	} catch (error) {
		console.log('AuthSaga.recover: ', error);
		yield put(AuthAction.processFailed('Refresh failed'));
	}
}

function* getUser({ payload }) {
	try {
		yield put(AuthAction.processing());
		const data = yield call(AuthApi.getUser, payload);
		yield put(AuthAction.getuserSuccess(data.data));
	} catch (error) {
		console.log('AuthSaga.recover: ', error);
		yield put(AuthAction.processFailed('Get User failed'));
	}
}

function* loginSaga() {
	while (true) {
		const { payload: { account, password, callback } } = yield take(AUTH_REQ_LOGIN);
		const task = yield fork(login, account, password, callback);

		const action = yield take([AUTH_REQ_LOGOUT, AUTH_LOGIN_ERROR]);
		if (action.type === AUTH_REQ_LOGOUT) {
			yield cancel(task);
			yield call(logout, action.payload)
			yield put(AuthAction.loggedOut());
		} else {
			yield put(AuthAction.loggedOut(action.payload));
		}
	}
}

function* authSaga() {
	// yield fork(loginSaga);
	yield all([
		takeEvery(AUTH_REQ_VERIFY_CODE, getVerificationCode),
		takeEvery(AUTH_REQ_REGISTER, register),
		takeEvery(AUTH_REQ_RECOVER_CODE, getRecoverCode),
		takeEvery(AUTH_REQ_RECOVER, recover),
		takeEvery(AUTH_REQ_REFRESH, refresh),
		takeEvery(AUTH_REQ_CURRENT_USER, getUser),
		takeEvery(AUTH_REQ_LOGOUT, logout),
		takeEvery(AUTH_REQ_LOGIN, login),
		takeEvery(AUTH_REQ_QLOGIN, qlogin),
		takeEvery(AUTH_LOGIN_ERROR, logout),
	]);
}

export default authSaga;
