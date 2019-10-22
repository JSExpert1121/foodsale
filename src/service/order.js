import RestClient from './base';
import * as config from "../config";

const ORDER_API_ROOT = config.SERVICE_API_URL + '/order/';

export default {
    getCoupons: (token, items) => {
        const data = { cart: { items: [] } };
        data.cart.items = items.map(item => ({ menu_item_id: item.id, quantity: item.quantity }));
        return RestClient.authPost(ORDER_API_ROOT + 'available_coupons', token, data).then(res => res.data);
    },
    getFulloffs: (token, items) => {
        const data = { cart: { items: [] } };
        data.cart.items = items.map(item => ({ menu_item_id: item.id, quantity: item.quantity }));
        return RestClient.authPost(ORDER_API_ROOT + 'available_full_off', token, data).then(res => res.data);
    },
    create: (token, items, coupon) => {
        const coupon_id = coupon ? coupon : -1;
        const data = { cart: { items: [] }, coupon_id };
        if (!coupon) delete data.coupon_id;
        data.cart.items = items.map(item => ({ menu_item_id: item.id, quantity: item.quantity }));
        return RestClient.authPost(ORDER_API_ROOT + 'create', token, data).then(res => res.data);
    },
    getDiningCodes: token => RestClient.authFetch(ORDER_API_ROOT + 'dining_codes', token),
    getDiningDetail: (token, id) => RestClient.authFetch(ORDER_API_ROOT + 'dining_codes/' + id, token)
}