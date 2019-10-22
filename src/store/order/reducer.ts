import {
    PROCESSING_DATA,
    PROCESS_FAILURE,

    ORDER_INCREASE_FOOD,
    ORDER_DECREASE_FOOD,
    ORDER_REQ_CLEAR_DETAIL,

    ORDER_RESET_SHOPPING,
    ORDER_SET_COUPON,

    ORDER_AVAILABLE_COUPON_SUCCESS,
    ORDER_AVAILABLE_FULLOFF_SUCCESS,
    ORDER_CREATE_SUCCESS,
    ORDER_DINING_SUCCESS,
    ORDER_DINING_DETAIL_SUCESS,
    ORDER_SET_ORDER_TIME
} from '../constants';
import { CouponInfo, FullOffInfo, OrderInfo } from '../../types/global';

type OrderState = {
    coupons: Array<CouponInfo>;
    fulloff?: FullOffInfo;
    order: OrderInfo;
    dinings: Array<any>;
    diningDetail: any;
    simpleOrder: any;
    coupon?: number;
    orderTime: { date: Date, id: number };
    isProcessing: boolean;
    success: boolean;
    message: string;
}

const initialState: OrderState = {
    coupons: [],
    fulloff: undefined,
    order: undefined,
    dinings: undefined,
    diningDetail: undefined,
    simpleOrder: {},
    coupon: undefined,
    orderTime: undefined,
    isProcessing: false,
    success: true,
    message: ''
};

export default function order_reducer(state = initialState, action) {
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
        case ORDER_INCREASE_FOOD:
            return {
                ...state,
                simpleOrder: {
                    ...state.simpleOrder,
                    [action.payload.id]: (!state.simpleOrder[action.payload.id]) ? {
                        name: action.payload.name,
                        url: action.payload.url,
                        price: action.payload.price,
                        count: 1
                    } : {
                            ...state.simpleOrder[action.payload.id],
                            count: state.simpleOrder[action.payload.id].count + 1
                        }
                }
            }
        case ORDER_DECREASE_FOOD:
            const simpleOrder = state.simpleOrder;
            if (simpleOrder[action.payload].count > 1) {
                return {
                    ...state,
                    simpleOrder: {
                        ...state.simpleOrder,
                        [action.payload]: {
                            ...state.simpleOrder[action.payload],
                            count: state.simpleOrder[action.payload].count > 0 ? state.simpleOrder[action.payload].count - 1 : 0
                        }
                    }
                }
            } else {
                delete simpleOrder[action.payload];
                return {
                    ...state,
                    simpleOrder: { ...simpleOrder }
                }
            }
        case ORDER_SET_ORDER_TIME:
            return {
                ...state,
                orderTime: { ...action.payload }
            }
        case ORDER_REQ_CLEAR_DETAIL:
            return {
                ...state,
                diningDetail: undefined
            }
        case ORDER_RESET_SHOPPING:
            return {
                ...state,
                simpleOrder: {},
                coupon: undefined,
                orderTime: { date: Date(), id: -1 }
            }
        case ORDER_SET_COUPON:
            return {
                ...state,
                coupon: action.payload
            }
        case ORDER_AVAILABLE_COUPON_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                coupons: action.payload
            }
        case ORDER_AVAILABLE_FULLOFF_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                fulloff: { ...action.payload }
            }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                order: { ...action.payload }
            }
        case ORDER_DINING_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                dinings: [...action.payload]
            }
        case ORDER_DINING_DETAIL_SUCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                diningDetail: { ...action.payload }
            }
        default:
            return state;
    }
}

