import {
    PROCESSING_DATA,
    ACCOUNT_REQ_BALANCE_HISTORY,
    ACCOUNT_REQ_POINT_HISTORY,
    ACCOUNT_REQ_PENDING_ORDER,
    ACCOUNT_REQ_PAID_ORDER,
    ACCOUNT_REQ_COMPLETE_ORDER,
    ACCOUNT_REQ_WAITING_COMMENT,
    ACCOUNT_REQ_ALREADY_COMMENT,
    ACCOUNT_REQ_COUPONS,
    ACCOUNT_REQ_UPLOAD_AVATAR,
    ACCOUNT_REQ_UPDATE_PROFILE,
    ACCOUNT_REQ_CHANGE_PASSWORD,
    ACCOUNT_REQ_UPDATE_PUSHER,

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

    ACCOUNT_CHANGE_PASSWORD_SUCCESS,
    ACCOUNT_UPDATE_PUSHER_SUCCESS,
    PROCESS_FAILURE,
} from '../constants';

export const processing = () => ({
    type: PROCESSING_DATA
});

export const processFailed = msg => ({
    type: PROCESS_FAILURE,
    payload: msg
});

export const getBalanceHistory = (token, start_id, size) => ({
    type: ACCOUNT_REQ_BALANCE_HISTORY,
    payload: { token, start_id, size }
});

export const getPointHistory = (token, start_id, size) => ({
    type: ACCOUNT_REQ_POINT_HISTORY,
    payload: { token, start_id, size }
});

export const getPendingOrder = (token, start_id, size) => ({
    type: ACCOUNT_REQ_PENDING_ORDER,
    payload: { token, start_id, size }
});

export const getPaidOrder = (token, start_id, size) => ({
    type: ACCOUNT_REQ_PAID_ORDER,
    payload: { token, start_id, size }
});

export const getCompleteOrder = (token, start_id, size) => ({
    type: ACCOUNT_REQ_COMPLETE_ORDER,
    payload: { token, start_id, size }
});

export const getWaitingComment = (token, start_id, size) => ({
    type: ACCOUNT_REQ_WAITING_COMMENT,
    payload: { token, start_id, size }
});

export const getAlreadyComment = (token, start_id, size) => ({
    type: ACCOUNT_REQ_ALREADY_COMMENT,
    payload: { token, start_id, size }
});

export const getCoupons = (token, start_id, size, status) => ({
    type: ACCOUNT_REQ_COUPONS,
    payload: { token, start_id, size, status }
});

export const uploadAvatar = (token, file) => ({
    type: ACCOUNT_REQ_UPLOAD_AVATAR,
    payload: { token, file }
});

export const uploadProfile = (token, nick_name, gender, birthday) => ({
    type: ACCOUNT_REQ_UPDATE_PROFILE,
    payload: { token, nick_name, gender, birthday }
});

export const changePassword = (token, old_password, password, password_confirmation) => ({
    type: ACCOUNT_REQ_CHANGE_PASSWORD,
    payload: { token, old_password, password, password_confirmation }
});

export const updatePusher = (token, pusher_id) => ({
    type: ACCOUNT_REQ_UPDATE_PUSHER,
    payload: { token, pusher_id }
});

export const balanceSuccess = (data) => ({
    type: ACCOUNT_BALANCE_HISTORY_SUCCESS,
    payload: data
});

export const pointSuccess = (data) => ({
    type: ACCOUNT_POINT_HISTORY_SUCCESS,
    payload: data
});

export const pendingOrderSuccess = (data) => ({
    type: ACCOUNT_PENDING_ORDER_SUCCESS,
    payload: data
});

export const paidOrderSuccess = data => ({
    type: ACCOUNT_PAID_ORDER_SUCCESS,
    payload: data
});

export const completeOrderSuccess = data => ({
    type: ACCOUNT_COMPLETE_ORDER_SUCCESS,
    payload: data
});

export const waitingCommentSuccess = data => ({
    type: ACCOUNT_WAITING_COMMENT_SUCCESS,
    payload: data
});

export const alreadyCommentSuccess = data => ({
    type: ACCOUNT_ALREADY_COMMENT_SUCCESS,
    payload: data
});

export const couponsSuccess = (data, status) => ({
    type: ACCOUNT_COUPONS_SUCCESS,
    payload: { data, status }
});

export const balanceMoreSuccess = (data) => ({
    type: ACCOUNT_BALANCE_HISTORY_MORE_SUCCESS,
    payload: data
});

export const pointMoreSuccess = (data) => ({
    type: ACCOUNT_POINT_HISTORY_MORE_SUCCESS,
    payload: data
});

export const pendingOrderMoreSuccess = (data) => ({
    type: ACCOUNT_PENDING_ORDER_MORE_SUCCESS,
    payload: data
});

export const paidOrderMoreSuccess = data => ({
    type: ACCOUNT_PAID_ORDER_MORE_SUCCESS,
    payload: data
});

export const completeOrderMoreSuccess = data => ({
    type: ACCOUNT_COMPLETE_ORDER_MORE_SUCCESS,
    payload: data
});

export const waitingCommentMoreSuccess = data => ({
    type: ACCOUNT_WAITING_COMMENT_MORE_SUCCESS,
    payload: data
});

export const alreadyCommentMoreSuccess = data => ({
    type: ACCOUNT_ALREADY_COMMENT_MORE_SUCCESS,
    payload: data
});

export const couponsMoreSuccess = (data, status) => ({
    type: ACCOUNT_COUPONS_MORE_SUCCESS,
    payload: { data, status }
});

export const changePassSuccess = () => ({
    type: ACCOUNT_CHANGE_PASSWORD_SUCCESS,
});

export const updatePusherSuccess = () => ({
    type: ACCOUNT_UPDATE_PUSHER_SUCCESS
});

