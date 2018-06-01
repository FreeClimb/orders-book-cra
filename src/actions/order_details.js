import axios from 'axios'

export const LOAD_ORDER_DETAILS = 'LOAD_ORDER_DETAILS'
export const LOAD_ORDER_DETAILS_SUCCESS = 'LOAD_ORDER_DETAILS_SUCCESS'
export const LOAD_ORDER_DETAILS_FAILURE = 'LOAD_ORDER_DETAILS_FAILURE'

export const CHANGE_SELECTED_ORDER_DETAIL = 'CHANGE_SELECTED_ORDER_DETAIL'

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// load order details
export const loadOrderDetails = (orderNum) => {
    const url = `${ROOT_URL}/details?orderNum=${orderNum}`;
    const request = axios.get(url);

    return {
        type: LOAD_ORDER_DETAILS,
        payload: request
    }
}
