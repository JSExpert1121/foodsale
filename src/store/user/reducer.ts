import {
    PROCESSING_DATA,
    PROCESS_SUCCESS,
    PROCESS_FAILURE,

    USER_RECENT_SUCCESS,
    USER_CURRENT_SUCCESS,
    USER_ASSIGNABLE_SUCCESS,

    USER_SET_LOCATION,
    USER_SET_CITY
} from '../constants';
import { NetworkInfo, CouponInfo, LocationInfo, CityInfo } from '../../types/global';

type UserState = {
    recent: Array<NetworkInfo>;
    current: NetworkInfo;
    coupons: Array<CouponInfo>;
    city: CityInfo;
    location: LocationInfo;
    isProcessing: boolean;
    success: boolean;
    message: string;
}

const initialState: UserState = {
    recent: [],
    current: undefined,
    coupons: [],
    city: undefined,
    location: undefined,
    isProcessing: false,
    success: true,
    message: ''
};

export default function user_reducer(state = initialState, action) {
    switch (action.type) {
        case PROCESSING_DATA:
            return {
                ...state,
                isProcessing: true
            };
        case PROCESS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                message: action.payload
            };
        case PROCESS_FAILURE:
            return {
                ...state,
                isProcessing: false,
                success: false,
                message: action.payload
            };
        case USER_RECENT_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                recent: action.payload
            }
        case USER_CURRENT_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                current: action.payload
            }
        case USER_ASSIGNABLE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                coupons: action.payload
            }
        case USER_SET_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        case USER_SET_CITY:
            return {
                ...state,
                city: action.payload
            }
        default:
            return state;
    }
}

