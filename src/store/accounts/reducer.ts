import {
    PROCESSING_DATA,
    PROCESS_FAILURE,

    ACCOUNT_BALANCE_HISTORY_SUCCESS,
    ACCOUNT_POINT_HISTORY_SUCCESS,
    ACCOUNT_PENDING_ORDER_SUCCESS,
    ACCOUNT_PAID_ORDER_SUCCESS,
    ACCOUNT_COMPLETE_ORDER_SUCCESS,
    ACCOUNT_WAITING_COMMENT_SUCCESS,
    ACCOUNT_ALREADY_COMMENT_SUCCESS,
    ACCOUNT_COUPONS_SUCCESS,

    ACCOUNT_BALANCE_HISTORY_MORE_SUCCESS,
    ACCOUNT_POINT_HISTORY_MORE_SUCCESS,
    ACCOUNT_PENDING_ORDER_MORE_SUCCESS,
    ACCOUNT_PAID_ORDER_MORE_SUCCESS,
    ACCOUNT_COMPLETE_ORDER_MORE_SUCCESS,
    ACCOUNT_WAITING_COMMENT_MORE_SUCCESS,
    ACCOUNT_ALREADY_COMMENT_MORE_SUCCESS,
    ACCOUNT_COUPONS_MORE_SUCCESS,
} from '../constants';
import { OrderInfo, OrderItem } from '../../types/global';

interface BalanceHistory {
    id: number;
    amount: number;
    note: string;
    created_at: string;
}

interface PointHistory {
    id: number;
    point: number;
    note: string;
    created_at: string;
}

type AccountState = {
    balanceHistory: BalanceHistory[];
    pointHistory: PointHistory[];
    pendingOrder: OrderInfo[];
    paidOrder: OrderInfo[];
    completeOrder: OrderInfo[];
    waitingComment: OrderItem[];
    alreadyComment: OrderItem[];
    coupons: any;
    isProcessing: boolean;
    message: string;
    success: boolean;
};

const initialState: AccountState = {
    balanceHistory: undefined,
    pointHistory: undefined,
    pendingOrder: undefined,
    paidOrder: undefined,
    completeOrder: undefined,
    waitingComment: undefined,
    alreadyComment: undefined,
    coupons: undefined,
    isProcessing: false,
    message: '',
    success: false
}

export default function account_reducer(state = initialState, action) {
    switch (action.type) {
        case PROCESSING_DATA:
            return {
                ...state,
                isProcessing: true
            }
        case PROCESS_FAILURE:
            return {
                ...state,
                message: action.payload,
                isProcessing: false,
                success: false
            }
        case ACCOUNT_BALANCE_HISTORY_SUCCESS:
            return {
                ...state,
                balanceHistory: action.payload,
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_POINT_HISTORY_SUCCESS:
            return {
                ...state,
                pointHistory: action.payload,
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_PENDING_ORDER_SUCCESS:
            return {
                ...state,
                pendingOrder: action.payload,
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_PAID_ORDER_SUCCESS:
            return {
                ...state,
                paidOrder: action.payload,
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_COMPLETE_ORDER_SUCCESS:
            return {
                ...state,
                completeOrder: action.payload,
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_WAITING_COMMENT_SUCCESS:
            return {
                ...state,
                waitingComment: action.payload,
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_ALREADY_COMMENT_SUCCESS:
            return {
                ...state,
                alreadyComment: action.payload,
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_COUPONS_SUCCESS:
            return {
                ...state,
                success: true,
                isProcessing: false,
                coupons: {
                    ...state.coupons,
                    [action.payload.status]: action.payload.data
                }
            }
        case ACCOUNT_BALANCE_HISTORY_MORE_SUCCESS:
            return {
                ...state,
                balanceHistory: [...state.balanceHistory, ...action.payload],
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_POINT_HISTORY_MORE_SUCCESS:
            return {
                ...state,
                pointHistory: [...state.pointHistory, ...action.payload],
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_PENDING_ORDER_MORE_SUCCESS:
            return {
                ...state,
                pendingOrder: [...state.pendingOrder, ...action.payload],
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_PAID_ORDER_MORE_SUCCESS:
            return {
                ...state,
                paidOrder: [...state.paidOrder, ...action.payload],
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_COMPLETE_ORDER_MORE_SUCCESS:
            return {
                ...state,
                completeOrder: [...state.completeOrder, ...action.payload],
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_WAITING_COMMENT_MORE_SUCCESS:
            return {
                ...state,
                waitingComment: [...state.waitingComment, ...action.payload],
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_ALREADY_COMMENT_MORE_SUCCESS:
            return {
                ...state,
                alreadyComment: [...state.alreadyComment, ...action.payload],
                success: true,
                isProcessing: false,
            }
        case ACCOUNT_COUPONS_MORE_SUCCESS:
            return {
                ...state,
                success: true,
                isProcessing: false,
                coupons: {
                    ...state.coupons,
                    [action.payload.status]: [...state.coupons[action.payload.status], ...action.payload.data]
                }
            }
        default:
            return state;
    }
}
