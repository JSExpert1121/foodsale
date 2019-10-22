import PayApi from '../service/pay';

export const pay = async (token, order_no, mode) => {
    const result = await PayApi.appPay(token, order_no, mode);
    if (mode !== 'balance') {

    }
}