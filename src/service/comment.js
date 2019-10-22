import RestClient from './base';
import * as config from "../config";

const COMMENT_API_ROOT = config.SERVICE_API_URL + '/comment/';

export default {
    uploadImage: (token, file) => RestClient.authUpload(
        COMMENT_API_ROOT + 'upload_image',
        token, file
    ),
    removeImage: (token, file) => RestClient.authPost(
        COMMENT_API_ROOT + 'remove_image',
        token, { file }
    ),
    create: (token, orderId, comment, score, images) => {
        const data = {
            order_item_id: orderId,
            comment, score, images
        }
        console.log(data);
        return RestClient.authPost(COMMENT_API_ROOT + 'create', token, data);
    },
    removeImage: (token, file) => RestClient.authPost(
        COMMENT_API_ROOT + 'remove_image',
        token, { file }
    ),
    getFoodComments: (token, foodId, start_id, size) => RestClient.authFetch(COMMENT_API_ROOT + 'food_comments', token, {
        food_id: foodId, start_id, size
    })
}