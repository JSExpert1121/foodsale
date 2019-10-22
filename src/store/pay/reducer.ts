import {
    PROCESSING_DATA,
    PROCESS_FAILURE,

    CONFIG_PAYMENT_GATEWAY_SUCCESS,
    DEPOSIT_ACTIVE_LIST_SUCCESS,
    PAY_REQ_SUCCESS,
} from '../constants';
import { GiftInfo, GatewayInfo } from '../../types/global';

type PayState = {
    gateway: GatewayInfo;
    gifts: GiftInfo[];
    isProcessing: boolean;
    success: boolean;
    message: string;
    credit: any;
}

const initialState: PayState = {
    gateway: undefined,
    gifts: [],
    isProcessing: false,
    success: true,
    credit: undefined,
    message: ''
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
        case CONFIG_PAYMENT_GATEWAY_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                gateway: action.payload
            }
        case DEPOSIT_ACTIVE_LIST_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                gifts: [...action.payload]
            }
        case PAY_REQ_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                credit: action.payload
            }
        default:
            return state;
    }
}

