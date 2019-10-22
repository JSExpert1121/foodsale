import {
    PROCESSING_DATA,
    PROCESS_FAILURE,

    FOOD_SALEABLE_SUCCESS,
    FOOD_SALE_TIME_SUCCESS,
    FOOD_POPULAR_SUCCESS,
    FOOD_INTEREST_SUCCESS,
    FOOD_DETAIL_SUCCESS,
    FOOD_COMMENT_SUCCESS,
    FOOD_SPECIALS_SUCCESS
} from '../constants';
import { TimeSpan, FoodInfo, FoodSummary } from '../../types/global';

type FoodState = {
    food: FoodInfo;
    time: TimeSpan;
    popular: FoodSummary;
    interest: FoodInfo;
    specials: FoodInfo[];
    isProcessing: boolean;
    success: boolean;
    message: string;
    detail: any;
    comments: any;
}

const initialState: FoodState = {
    food: undefined,
    time: undefined,
    popular: undefined,
    interest: undefined,
    specials: [],
    detail: undefined,
    isProcessing: false,
    success: true,
    message: '',
    comments: []
};

export default function user_reducer(state = initialState, action) {
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
        case FOOD_SALEABLE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                food: action.payload
            }
        case FOOD_SALE_TIME_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                time: action.payload
            }
        case FOOD_POPULAR_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                popular: action.payload
            }
        case FOOD_INTEREST_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                interest: action.payload
            }
        case FOOD_DETAIL_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                detail: action.payload
            }
        case FOOD_COMMENT_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                comments: action.payload
            }
        case FOOD_SPECIALS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                specials: action.payload
            }
        default:
            return state;
    }
}

