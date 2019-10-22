import {
	PROCESSING_DATA,
	PROCESS_SUCCESS,
	PROCESS_FAILURE,
	CLEAR_MESSAGE,

	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_ERROR,
	ACCOUNT_UPLOAD_AVATAR_SUCCESS,
	ACCOUNT_UPDATE_PROFILE_SUCCESS,
	AUTH_REFRESH_SUCCESS,
	AUTH_REGISTER_SUCCESS,
	AUTH_GETUSER_SUCCESS,
	AUTH_LOGOUT
} from '../constants';
import { UserInfo, TokenInfo } from '../../types/global';

type AuthState = {
	user?: UserInfo;
	token?: TokenInfo;
	isProcessing: boolean;
	success: boolean;
	message: string;
}
const initialState: AuthState = {
	user: undefined,
	token: undefined,
	success: false,
	isProcessing: false,
	message: ''
}

export default function auth_reducer(state = initialState, action) {
	switch (action.type) {
		case CLEAR_MESSAGE:
			return {
				...state,
				message: ''
			}
		case PROCESSING_DATA:
			return {
				...state,
				isProcessing: true
			}
		case PROCESS_SUCCESS:
			return {
				...state,
				isProcessing: false,
				success: true,
				message: action.payload
			}
		case PROCESS_FAILURE:
			return {
				...state,
				isProcessing: false,
				success: false,
				message: action.payload
			}
		case AUTH_LOGIN_SUCCESS:
		case AUTH_REFRESH_SUCCESS:
			return {
				...state,
				isProcessing: false,
				success: true,
				token: action.payload
			}
		case AUTH_REGISTER_SUCCESS:
		case AUTH_GETUSER_SUCCESS:
			return {
				...state,
				isProcessing: false,
				success: true,
				user: action.payload
			}
		case AUTH_LOGOUT:
			if (!action.payload) {
				return {
					...state,
					user: undefined,
					token: undefined,
					success: true,
					isProcessing: false
				}
			} else {
				return {
					...state,
					user: undefined,
					token: undefined,
					success: false,
					message: action.payload,
					isProcessing: false
				}
			}
		case ACCOUNT_UPLOAD_AVATAR_SUCCESS:
			return {
				...state,
				user: action.payload
			}
		case ACCOUNT_UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				user: action.payload
			}
		default:
			return state
	}
}
