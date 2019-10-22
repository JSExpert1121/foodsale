import {
	AUTH_REQ_VERIFY_CODE,
	AUTH_REQ_REGISTER,
	AUTH_REQ_RECOVER_CODE,
	AUTH_REQ_RECOVER,
	AUTH_REQ_LOGIN,
	AUTH_REQ_QLOGIN,
	AUTH_REQ_LOGOUT,
	AUTH_REQ_REFRESH,
	AUTH_REQ_CURRENT_USER,
	AUTH_LOGIN_ERROR,
	AUTH_LOGIN_SUCCESS,
	AUTH_REFRESH_SUCCESS,
	AUTH_REGISTER_SUCCESS,
	AUTH_GETUSER_SUCCESS,
	AUTH_LOGOUT,
	ACCOUNT_UPLOAD_AVATAR_SUCCESS,
	ACCOUNT_UPDATE_PROFILE_SUCCESS,
	PROCESSING_DATA,
	PROCESS_SUCCESS,
	PROCESS_FAILURE,
	CLEAR_MESSAGE
} from '../constants'

export const clearMessage = () => ({
	type: CLEAR_MESSAGE
});

export const processing = () => ({
	type: PROCESSING_DATA
});

export const getVerification = (phoneNo: string) => ({
	type: AUTH_REQ_VERIFY_CODE,
	payload: phoneNo
});

export const register = (account: string, password: string, password_confirmation: string, verify_code: string) => ({
	type: AUTH_REQ_REGISTER,
	payload: {
		account, password, password_confirmation, verify_code
	}
});

export const getRecoverCode = (phoneNo: string) => ({
	type: AUTH_REQ_RECOVER_CODE,
	payload: phoneNo
});

export const recoverPassword = (account: string, password: string, password_confirmation: string, verify_code: string) => ({
	type: AUTH_REQ_RECOVER,
	payload: {
		account, password, password_confirmation, verify_code
	}
});

export const login = (account: string, password: string, cb: Function) => ({
	type: AUTH_REQ_LOGIN,
	payload: {
		account, password, callback: cb
	}
});

export const qlogin = (account: string, code: string, cb: Function) => ({
	type: AUTH_REQ_QLOGIN,
	payload: {
		account, code, callback: cb
	}
});

export const refresh = (token: string) => ({
	type: AUTH_REQ_REFRESH,
	payload: token
});

export const logout = (token: string) => ({
	type: AUTH_REQ_LOGOUT,
	payload: token
});

export const getUser = (token: string) => ({
	type: AUTH_REQ_CURRENT_USER,
	payload: token
});

export const loginFailed = (message) => ({
	type: AUTH_LOGIN_ERROR,
	payload: message
});

export const loginSuccess = (data) => ({
	type: AUTH_LOGIN_SUCCESS,
	payload: data
});

export const refreshSuccess = (data) => ({
	type: AUTH_REFRESH_SUCCESS,
	payload: data
});

export const registerSuccess = (data) => ({
	type: AUTH_REGISTER_SUCCESS,
	payload: data
});

export const getuserSuccess = data => ({
	type: AUTH_GETUSER_SUCCESS,
	payload: data
});

export const loggedOut = (data) => ({
	type: AUTH_LOGOUT,
	payload: data
});

export const processSuccess = msg => ({
	type: PROCESS_SUCCESS,
	payload: msg
});

export const processFailed = msg => ({
	type: PROCESS_FAILURE,
	payload: msg
});

export const avatarChanged = data => ({
	type: ACCOUNT_UPLOAD_AVATAR_SUCCESS,
	payload: data
});

export const profileChanged = data => ({
	type: ACCOUNT_UPDATE_PROFILE_SUCCESS,
	payload: data
});