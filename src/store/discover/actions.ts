import {
    PROCESSING_DATA,
    PROCESS_FAILURE,

    DISCOVER_REQ_ARTICLES,
    DISCOVER_REQ_COMMENTS,
    DISCOVER_COMMENTS_SUCCESS,
    DISCOVER_ARTICLES_SUCCESS
} from '../constants'

export const processing = () => ({
    type: PROCESSING_DATA
});

export const processFailed = msg => ({
    type: PROCESS_FAILURE,
    payload: msg
})

export const getArticles = (token, start, size) => ({
    type: DISCOVER_REQ_ARTICLES,
    payload: { token, start, size }
});

export const getComments = (token, start, size) => ({
    type: DISCOVER_REQ_COMMENTS,
    payload: { token, start, size }
});

export const articlesSuccess = data => ({
    type: DISCOVER_ARTICLES_SUCCESS,
    payload: data
});

export const commentsSuccess = data => ({
    type: DISCOVER_COMMENTS_SUCCESS,
    payload: data
});

