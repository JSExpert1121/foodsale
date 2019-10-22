import RestClient from './base';
import * as config from "../config";

const DISCOVER_API_ROOT = config.SERVICE_API_URL + '/discover/';

export default {
    getArticles: (token, start_id, size) => RestClient.authFetch(DISCOVER_API_ROOT + 'articles', token, {
        start_id, size
    }),
    getComments: (token, start_id, size) => RestClient.authFetch(DISCOVER_API_ROOT + 'comments', token, {
        start_id, size
    }),
}