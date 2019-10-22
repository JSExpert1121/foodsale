import RestClient from './base';
import * as config from "../config";

const CITY_API_ROOT = config.SERVICE_API_URL + '/city/';

export default {
    getActiveCities: (token) => RestClient.authFetch(CITY_API_ROOT + 'active_cities', token),
    getNearbyNetworks: (token, lat, lng, radius, city_code) => RestClient.authFetch(CITY_API_ROOT + 'nearby_network', token, {
        lat, lng, radius, city_code
    })
}