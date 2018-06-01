import {
    LOAD_ORDER_DETAILS, LOAD_ORDER_DETAILS_SUCCESS, LOAD_ORDER_DETAILS_FAILURE,
    CHANGE_SELECTED_ORDER_DETAIL
} from '../actions/order_details'

const INITIAL_STATE = {
    orderDetails: [],
    selectedOrderDetail: null,
    // busy 
    loadingOrderDetails: false,
    // errors
    errorLoadingOrderDetails: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: [],
                selectedOrderDetail: null,
                loadingOrderDetails: true,
                errorLoadingOrderDetails: null
            }
        case LOAD_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetails: action.payload,
                loadingOrderDetails: false,
                errorLoadingOrderDetails: null
            }
        case LOAD_ORDER_DETAILS_FAILURE:
            return {
                ...state,
                orderDetails: [],
                loadingOrderDetails: false,
                errorLoadingOrderDetails: action.payload
            }
        case CHANGE_SELECTED_ORDER_DETAIL:
            return {
                ...state,
                selectedOrderDetail: action.payload,
            }
        default:
            return state
    }
}
