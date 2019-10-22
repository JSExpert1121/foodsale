import RestClient from './base';
import * as config from "../config";
import { couponsSuccess } from '../store/order/actions';

const ACCOUNT_API_ROOT = config.SERVICE_API_URL + '/account/';

export default {
    getBalanceHistory: (token, start, size) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'balance_history',
        token,
        { start_id: start, size }
    ),
    getPointHistory: (token, start, size) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'point_history',
        token,
        { start_id: start, size }
    ),
    getPendingOrders: (token, start, size) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'pending_order',
        token,
        { start_id: start, size }
    ),
    getPaidOrders: (token, start, size) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'paid_order',
        token,
        { start_id: start, size }
    ),
    getCompletedOrders: (token, start, size) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'complete_order',
        token,
        { start_id: start, size }
    ),
    getWaitingComments: (token, start, size) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'waiting_comment',
        token,
        { start_id: start, size }
    ),
    getComments: (token, start, size) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'already_comment',
        token,
        { start_id: start, size }
    ),
    uploadAvatar: (token, file) => RestClient.authUpload(
        ACCOUNT_API_ROOT + 'upload_avatar',
        token, file
    ),
    updateProfile: (token, nick, gender, birthday) => RestClient.authPost(
        ACCOUNT_API_ROOT + 'update_profile',
        token,
        { nick_name: nick, gender, birthday }
    ),
    updatePusher: (token, pusher_id) => RestClient.authPost(
        ACCOUNT_API_ROOT + 'update_pusher',
        token,
        { pusher_id }
    ),
    changePassword: (token, old_password, password, password_confirmation) => RestClient.authPost(
        ACCOUNT_API_ROOT + 'change_password',
        token,
        { old_password, password, password_confirmation }
    ),
    getCoupons: (token, start_id, size, status) => RestClient.authFetch(
        ACCOUNT_API_ROOT + 'coupons', token,
        { start_id, size, status }
    ),
}