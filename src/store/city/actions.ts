import {
    CITY_REQ_ACTIVE,
    CITY_REQ_NEARBY,
    CITY_ACTIVE_SUCCESS,
    CITY_NEARBY_SUCCESS,
    PROCESSING_DATA,
    PROCESS_FAILURE
} from '../constants'

export const processing = () => ({
    type: PROCESSING_DATA
});

export const processFailed = msg => ({
    type: PROCESS_FAILURE,
    payload: msg
})

export const getActiveCities = (token: string) => ({
    type: CITY_REQ_ACTIVE,
    payload: token
});

export const getNearbyNetwork = (token: string, lat: number, lng: number, radius: number, city: string) => ({
    type: CITY_REQ_NEARBY,
    payload: { token, lat, lng, radius, city }
});

export const activeSuccess = (data) => ({
    type: CITY_ACTIVE_SUCCESS,
    payload: data
});

export const nearbySuccess = (data) => ({
    type: CITY_NEARBY_SUCCESS,
    payload: data
});