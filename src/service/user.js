import RestClient from './base';
import * as config from "../config";

const USER_API_ROOT = config.SERVICE_API_URL + '/user/';

export default {
    getRecentNetworks: (token) => RestClient.authFetch(USER_API_ROOT + 'recently_network', token),
    getCurrentNetwork: (token) => RestClient.authFetch(USER_API_ROOT + 'current_network', token),
    addNetwork: (token, outlet) => RestClient.authPost(USER_API_ROOT + 'add_network', token, {
        business_outlet_id: outlet
    }),
    getCoupons: (token) => RestClient.authFetch(USER_API_ROOT + 'assignable_coupons', token),
    assignCoupon: (token, id) => RestClient.authPost(USER_API_ROOT + 'assign_coupon', token, {
        coupon_id: id
    }),
    changePassword: (token, oldpass, newpass, confirm) => RestClient.authPost(
        USER_API_ROOT + 'change_password',
        token, {
            old_password: oldpass,
            password: newpass,
            password_confirmation: confirm
        }
    )
}