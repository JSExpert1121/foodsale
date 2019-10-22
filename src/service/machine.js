import RestClient from './base';
import * as config from "../config";

const MACHINE_API_ROOT = config.SERVICE_API_URL + '/machine/';

export default {
    checkOrderStatus: (token, orderId) => RestClient.authFetch(
        MACHINE_API_ROOT + 'check_order_status',
        token, { order_id: orderId }
    ),
    getDiningMat: (token, code) => RestClient.authFetch(
        MACHINE_API_ROOT + 'dining_matrix/' + code,
        token
    ),
    updateMatStatus: (token, ids, status) => RestClient.authPost(
        MACHINE_API_ROOT + 'update_matrix_status',
        token, { ids, status }
    ),
    getRecentMenus: (token) => RestClient.authFetch(
        MACHINE_API_ROOT + 'menus', token
    ),
    getMenu: (token, menuId) => RestClient.authFetch(
        MACHINE_API_ROOT + 'menus/' + menuId, token
    ),
    getSaleableFoods: (token) => RestClient.authFetch(
        MACHINE_API_ROOT + 'saleable_food', token
    ),
    getManagerInfo: (token, orderNo) => RestClient.authPost(
        MACHINE_API_ROOT + 'manager_info',
        token, { order_no: orderNo }
    ),
    getManagerInfoByQR: (token, qr_code) => RestClient.authFetch(
        MACHINE_API_ROOT + 'manager_info',
        token, { qr_code }
    )
}
