import {
    FOOD_REQ_SALEABLE,
    FOOD_REQ_SALE_TIME,
    FOOD_REQ_POPULAR,
    FOOD_REQ_INTEREST,
    FOOD_REQ_DETAIL,
    FOOD_SALEABLE_SUCCESS,
    FOOD_SALE_TIME_SUCCESS,
    FOOD_POPULAR_SUCCESS,
    FOOD_INTEREST_SUCCESS,
    FOOD_DETAIL_SUCCESS,
    PROCESSING_DATA,
    PROCESS_FAILURE,
    FOOD_REQ_COMMENT,
    FOOD_REQ_SPECIALS,
    FOOD_COMMENT_SUCCESS,
    FOOD_SPECIALS_SUCCESS
} from '../constants'

export const processing = () => ({
    type: PROCESSING_DATA
});

export const processFailed = msg => ({
    type: PROCESS_FAILURE,
    payload: msg
})

export const getSaleable = (token: string, outlet: number, catId: number, date: string) => ({
    type: FOOD_REQ_SALEABLE,
    payload: { token, outlet, catId, date }
});

export const getSaleTime = (token: string) => ({
    type: FOOD_REQ_SALE_TIME,
    payload: token
});

export const getPopularFood = (token: string, outlet: number) => ({
    type: FOOD_REQ_POPULAR,
    payload: { token, outlet }
});

export const getInterestFood = (token: string, outlet: number) => ({
    type: FOOD_REQ_INTEREST,
    payload: { token, outlet }
});

export const getFoodDetail = (token: string, foodId: number) => ({
    type: FOOD_REQ_DETAIL,
    payload: { token, foodId }
});

export const getFoodComments = (token: string, foodId: number, start_id: number, size: number) => ({
    type: FOOD_REQ_COMMENT,
    payload: { token, foodId, start_id, size }
});

export const getSpecialFood = (token: string, outlet: number, date: string) => ({
    type: FOOD_REQ_SPECIALS,
    payload: { token, outlet, date }
});

export const saleableSuccess = data => ({
    type: FOOD_SALEABLE_SUCCESS,
    payload: data
});

export const timeSuccess = data => ({
    type: FOOD_SALE_TIME_SUCCESS,
    payload: data
});

export const popularSuccess = data => ({
    type: FOOD_POPULAR_SUCCESS,
    payload: data
});

export const interestSuccess = data => ({
    type: FOOD_INTEREST_SUCCESS,
    payload: data
});

export const detailSuccess = data => ({
    type: FOOD_DETAIL_SUCCESS,
    payload: data
});

export const commentSuccess = data => ({
    type: FOOD_COMMENT_SUCCESS,
    payload: data
});

export const specialsSuccess = data => ({
    type: FOOD_SPECIALS_SUCCESS,
    payload: data
});
