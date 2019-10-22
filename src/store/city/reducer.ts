import {
    PROCESSING_DATA,
    PROCESS_FAILURE,

    CITY_ACTIVE_SUCCESS,
    CITY_NEARBY_SUCCESS
} from '../constants';
import { NetworkInfo, CityInfo } from '../../types/global';

type CityState = {
    networks: Array<NetworkInfo>;
    cities: Array<CityInfo>;
    isProcessing: boolean;
    success: boolean;
    message: string;
}

const initialState: CityState = {
    networks: [],
    cities: [],
    isProcessing: false,
    success: true,
    message: ''
};

export default function city_reducer(state = initialState, action) {
    switch (action.type) {
        case PROCESSING_DATA:
            return {
                ...state,
                isProcessing: true
            };
        case PROCESS_FAILURE:
            return {
                ...state,
                isProcessing: false,
                success: false,
                message: action.payload
            };
        case CITY_ACTIVE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: false,
                cities: action.payload
            }
        case CITY_NEARBY_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: false,
                networks: action.payload
            }
        default:
            return state;
    }
}

