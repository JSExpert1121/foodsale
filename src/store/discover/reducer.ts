import {
    PROCESSING_DATA,
    PROCESS_FAILURE,

    DISCOVER_COMMENTS_SUCCESS,
    DISCOVER_ARTICLES_SUCCESS
} from '../constants';
import { TimeSpan, FoodInfo, FoodSummary } from '../../types/global';

type DiscoverState = {
    isProcessing: boolean;
    success: boolean;
    message: string;
    articles: Array<any>;
    comments: Array<any>;
}

const initialState: DiscoverState = {
    isProcessing: false,
    success: true,
    message: '',
    articles: [],
    comments: [],
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
        case DISCOVER_COMMENTS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                comments: action.payload
            }
        case DISCOVER_ARTICLES_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                articles: action.payload
            }
        default:
            return state;
    }
}

