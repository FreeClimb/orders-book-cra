import {
    LOAD_ORDERS, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAILURE,
    CHANGE_SELECTED_ORDER, FILTERED_ORDERS, CALC_TOTAL,
    UPDATE_ORDER, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE
} from '../actions/orders'


const INITIAL_STATE = {
    orders: [],
    selectedOrder: null,
    filterOrders: [],
    total: 0,
    // busy 
    loadingOrders: false,
    savingOrder: false,
    // errors
    errorLoadingOrders: null,
    errorSavingOrder: null
};

export default (state = INITIAL_STATE, action) => {
    let ord, i, ords;
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                ...state,
                orders: [],
                selectedOrder: null,
                filterOrders: [],
                orderDetails: [],
                loadingOrders: true,
                total: 0
            }
        case LOAD_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loadingOrders: false,
                errorLoadingOrders: null
            }
        case LOAD_ORDERS_FAILURE:
            return {
                ...state,
                orders: [],
                loadingOrders: false,
                errorLoadingOrders: action.payload
            }
        case CHANGE_SELECTED_ORDER:
            return {
                ...state,
                selectedOrder: action.payload,
                total: 0,
                // loadingOrderDetails: true
            }
        case CALC_TOTAL:
            return {
                ...state,
                total: action.payload,
            }
        case FILTERED_ORDERS:
            return {
                ...state,
                filterOrders: action.payload,
                // selectedOrder: null,
                // total: 0
            }
        case UPDATE_ORDER:
            return {
                ...state,
                savingOrder: true,
                errorSavingOrder: null
            }
        case UPDATE_ORDER_SUCCESS:
            ord = action.payload;
            ords = state.orders;
            i = ords.map(x => x.orderNum).indexOf(ord.orderNum);
            if (i > -1) {
                ords[i].completed = ord.completed;
                ords[i].status = ord.status;
            }
            return {
                ...state,
                savingOrder: false,
                errorSavingOrder: null,
                orders: ords,
                selectedOrder: ord
            }
        case UPDATE_ORDER_FAILURE:
            return {
                ...state,
                savingOrder: false,
                errorSavingOrder: action.payload
            }
        default:
            return state
    }
}
