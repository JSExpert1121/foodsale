import RestClient from './base';
import * as config from "../config";

const FOOD_API_ROOT = config.SERVICE_API_URL + '/food/';

export default {
    getSaleFood: (token, outlet, catid, date) => RestClient.authFetch(FOOD_API_ROOT + 'saleable_food', token, {
        business_outlet_id: outlet,
        category_id: catid,
        date
    }),
    getSaleTimes: (token) => RestClient.authFetch(FOOD_API_ROOT + 'sale_times', token),
    getPopularFood: (token, outlet) => RestClient.authFetch(FOOD_API_ROOT + 'popular_food', token, {
        business_outlet_id: outlet
    }),
    getInterestFood: (token, outlet) => RestClient.authFetch(FOOD_API_ROOT + 'interest_food', token, {
        business_outlet_id: outlet
    }),
    getFoodDetail: (token, id) => RestClient.authFetch(FOOD_API_ROOT + 'food/' + id, token),
    getSpecialFoods: (token, outlet, date) => RestClient.authFetch(FOOD_API_ROOT + 'special_food', token, {
        business_outlet_id: outlet,
        date
    }),
}