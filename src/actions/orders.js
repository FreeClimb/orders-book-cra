import axios from 'axios'

export const LOAD_ORDERS = 'LOAD_ORDERS'
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS'
export const LOAD_ORDERS_FAILURE = 'LOAD_ORDERS_FAILURE'

export const CHANGE_SELECTED_ORDER = 'CHANGE_SELECTED_ORDER'
export const FILTERED_ORDERS = 'FILTERED_ORDERS'
export const CALC_TOTAL = 'CALC_TOTAL'

export const UPDATE_ORDER = 'UPDATE_ORDER'
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS'
export const UPDATE_ORDER_FAILURE = 'UPDATE_ORDER_FAILURE'


const ROOT_URL = process.env.REACT_APP_ROOT_URL;


// load orders
export const loadOrders = () => {
    const url = `${ROOT_URL}/all`;
    const request = axios.get(url);

    return {
        type: LOAD_ORDERS,
        payload: request
    }
}

// load order details
export const updateOrder = (orderNum) => {
    const url = `${ROOT_URL}/${orderNum}`;
    const request = axios.patch(url);

    return {
        type: UPDATE_ORDER,
        payload: request
    }
}


